import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { prisma } from '@/lib/prisma'; // 🔒 SINGLETON PATTERN
import { calculateDialysisProject } from '@/lib/engine/v3-underwriting';
import { DPRTemplate } from '@/components/pdf/DPRTemplate';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { simulationId } = await req.json();

    // 1. Fetch data safely
    const simulation = await prisma.simulation.findUnique({
      where: { id: simulationId },
      include: { 
        project: { 
          include: { tenant: { include: { facilities: true } } } 
        } 
      }
    });

    if (!simulation) {
      return NextResponse.json({ error: "Simulation record not found. Please save first." }, { status: 404 });
    }

    // 2. IDEMPOTENCY: Safely return existing report
    if (simulation.status === "REPORT_GENERATED" && simulation.reportPath) {
      const { data: signedData, error: signError } = await supabase.storage
        .from('dprs')
        .createSignedUrl(simulation.reportPath, 3600); 

      if (signError || !signedData) throw new Error("Could not retrieve existing report link.");
      
      return NextResponse.json({ url: signedData.signedUrl, status: "EXISTING" });
    }

    // 3. Robust Location Logic
    const targetFacility = simulation.project.tenant?.facilities?.[0]; 
    const state = targetFacility?.state || "Other";

    // 4. Execute Underwriting Engine
    const engineResults = calculateDialysisProject({
      machines: simulation.project.machines,
      state: state,
      cityTier: simulation.project.cityTier === 1 ? "tier1" : simulation.project.cityTier === 2 ? "tier2" : "tier3",
      isNABH: simulation.isNABH ?? true,
      sessionsPerDay: 3, // 🟢 FIXED: Hardcoded to 3 standard shifts to resolve TypeScript schema error
      payorMix: { 
        pmjay: simulation.pmjayMix || 60, 
        private: (100 - (simulation.pmjayMix || 60)) 
      }
    });

    // 5. Generate PDF Buffer
    const pdfBuffer = await renderToBuffer(
      <DPRTemplate 
        data={{
          ...engineResults,
          hospitalName: simulation.project.name,
          simulationId: simulation.id,
          timestamp: new Date().toLocaleDateString('en-IN')
        }} 
      />
    );

    const fileName = `DPR_${simulation.projectId}_${Date.now()}.pdf`;
    const filePath = `reports/${simulation.projectId}/${fileName}`;
    
    // 6. Secure Storage Upload
    const { error: uploadError } = await supabase.storage
      .from('dprs')
      .upload(filePath, pdfBuffer, { contentType: 'application/pdf' });

    if (uploadError) throw uploadError;

    // 7. Update DB State
    await prisma.simulation.update({
      where: { id: simulation.id },
      data: { 
        status: "REPORT_GENERATED",
        reportPath: filePath 
      }
    });

    // 8. Explicit error handling on new Signed URL
    const { data: signedUrlData, error: newSignError } = await supabase.storage
      .from('dprs')
      .createSignedUrl(filePath, 3600);

    if (newSignError || !signedUrlData) {
      throw new Error("Report generated, but failed to create secure download link.");
    }

    return NextResponse.json({ 
      success: true, 
      url: signedUrlData.signedUrl,
      leadId: simulation.projectId 
    });

  } catch (error: any) {
    console.error("[DPR_GENERATOR_CRITICAL]:", error);
    return NextResponse.json({ error: error.message || "Failed to generate investor report." }, { status: 500 });
  }
}