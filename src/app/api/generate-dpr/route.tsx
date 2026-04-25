// src/app/api/generate-dpr/route.tsx
import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { supabase } from '@/lib/supabase';

// ✅ FIX 1: Import the standardized function name
import { generateDPRNarrative } from '@/lib/engine/narrative';

// ✅ FIX 2: Import the core engine to calculate math before rendering
import { calculateV7Sovereign } from '@/lib/sovereign-engine';

// ✅ FIX 3: Import the finalized template
import { DPRTemplate } from '@/components/pdf/DPRTemplate';

export async function POST(req: Request) {
  try {
    const { projectId } = await req.json();

    // Fetch project inputs from Supabase
    const { data: project, error: fetchError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (fetchError || !project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // 🔥 STEP 1: RUN THE ENGINE (Critical: This creates the numbers)
    // Map DB fields to engine inputs
    const engineResults = calculateV7Sovereign({
      machines: project.machines,
      sessionsPerDay: project.sessions_per_day,
      downtime: project.downtime_percentage,
      pmjay: project.payor_mix_pmjay,
      pvt: project.payor_mix_private,
      tpa: project.payor_mix_tpa,
      mode: project.dialyzer_mode
    });

    // 🔥 STEP 2: GENERATE NARRATIVE
    // Uses the standardized logic we just finalized
    const summary = generateDPRNarrative({
      ebitda: engineResults.ebitda,
      downtimeLoss: engineResults.downtimeLoss,
      underutilizationLoss: engineResults.underutilizationLoss,
      payorMix: { private: project.payor_mix_private }
    });

    // 🔥 STEP 3: RENDER PDF
    // Pass both inputs (project) and outputs (engineResults + summary)
    const pdfBuffer = await renderToBuffer(
      <DPRTemplate 
        data={{
          ...project,
          ...engineResults,
          ...summary
        }} 
      />
    );

    // 🔥 STEP 4: UPLOAD TO SUPABASE
    const fileName = `DPR_${project.name.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
    
    const { error: uploadError } = await supabase.storage
      .from('dprs')
      .upload(fileName, pdfBuffer, { 
        contentType: 'application/pdf',
        upsert: true 
      });

    if (uploadError) throw uploadError;

    // 🔥 STEP 5: GET PUBLIC URL
    const { data: { publicUrl } } = supabase.storage
      .from('dprs')
      .getPublicUrl(fileName);
    
    return NextResponse.json({ url: publicUrl });

  } catch (error: any) {
    console.error("DPR Generation Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}