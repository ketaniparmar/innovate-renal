// src/app/api/cron/report-usage/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// ✅ 1. INSTITUTIONAL TYPE DEFINITIONS
// Perfectly aligned with your actual schema.prisma
interface SovereignProject {
  id: string;
  name: string;
  machines: number;
}

export async function GET() {
  try {
    // 2. FETCH ACTIVE INFRASTRUCTURE DNA
    // We are now strictly querying columns that actually exist in your database.
    const { data: projects, error } = await supabase
      .from('projects')
      .select('id, name, machines');

    if (error) {
      console.error("🧬 SOVEREIGN OS: Supabase Retrieval Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 3. OPERATIONAL BILLING ENGINE
    const billingResults = (projects as SovereignProject[] || []).map((project) => {
      
      // Calculate theoretical clinical usage based on machine count (26 days * 3 shifts)
      const theoreticalSessions = (project.machines || 0) * 78;
      const rate = 1500; // Default baseline rate
      const usageCharge = theoreticalSessions * rate;

      return {
        identity: project.name,
        sessionsReported: theoreticalSessions,
        chargeCalculated: usageCharge,
        status: usageCharge > 0 ? 'Invoiced' : 'Baseline_Maintenance'
      };
    });

    // 4. AUDITABLE SUCCESS RESPONSE
    console.log(`✅ USAGE REPORT COMPLETE: ${billingResults.length} projects processed.`);
    
    return NextResponse.json({ 
      success: true, 
      system: "Sovereign OS v9.0",
      processedCount: billingResults.length,
      auditTrail: billingResults 
    }, { status: 200 });

  } catch (error: any) {
    console.error("❌ CRON SYSTEM FAILURE:", error.message);
    return NextResponse.json({ 
      success: false, 
      error: "Usage Engine failed to boot",
      details: error.message 
    }, { status: 500 });
  }
}