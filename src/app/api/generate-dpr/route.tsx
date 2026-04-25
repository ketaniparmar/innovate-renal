// src/app/api/generate-dpr/route.tsx
import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { supabase } from '@/lib/supabase';
import { generateDPRNarrative } from '@/lib/engine/narrative';
import { calculateV7Sovereign } from '@/lib/sovereign-engine';
import { DPRTemplate } from '@/components/pdf/DPRTemplate';

export async function POST(req: Request) {
  try {
    const { projectId } = await req.json();

    const { data: project, error: fetchError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (fetchError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const engineResults = calculateV7Sovereign({
      machines: project.machines || 0,
      sessionsPerDay: project.sessions_per_day || 0,
      downtime: project.downtime_percentage || 0,
      pmjay: project.payor_mix_pmjay || 0,
      pvt: project.payor_mix_private || 0,
      tpa: project.payor_mix_tpa || 0,
      mode: project.dialyzer_mode || 'standard'
    });

    const summary = generateDPRNarrative({
      ebitda: engineResults.ebitda || 0,
      downtimeLoss: engineResults.downtimeLoss || 0,
      underutilizationLoss: engineResults.underutilizationLoss || 0,
      payorMix: { private: project.payor_mix_private || 0 }
    });

    const pdfBuffer = await renderToBuffer(
      <DPRTemplate 
        data={{
          ...project,
          ...engineResults,
          ...summary,
          payorMix: {
            pmjay: project.payor_mix_pmjay || 0,
            private: project.payor_mix_private || 0,
            tpa: project.payor_mix_tpa || 0
          }
        }} 
      />
    );

    const safeName = (project.name || 'Project').replace(/\s+/g, '_');
    const fileName = `DPR_${safeName}_${Date.now()}.pdf`;
    
    const { error: uploadError } = await supabase.storage
      .from('dprs')
      .upload(fileName, pdfBuffer, { contentType: 'application/pdf', upsert: true });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage.from('dprs').getPublicUrl(fileName);
    return NextResponse.json({ url: publicUrl });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}