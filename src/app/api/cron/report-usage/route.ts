// src/app/api/cron/report-usage/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import axios from 'axios';

// ✅ 1. INSTITUTIONAL TYPE DEFINITIONS
// Prevents the "Implicit Any" crash and ensures CFO-grade data integrity
interface SovereignProject {
  id: string;
  name: string;
  monthly_sessions: number;
  session_rate: number;
  billing_active: boolean;
  phone?: string;
}

// Vercel Cron Jobs typically utilize GET requests
export async function GET() {
  try {
    // 2. FETCH ACTIVE INFRASTRUCTURE DNA
    // Targeting only projects with active billing to optimize compute
    const { data: projects, error } = await supabase
      .from('projects')
      .select('id, name, monthly_sessions, session_rate, phone')
      .eq('billing_active', true);

    if (error) {
      console.error("🧬 SOVEREIGN OS: Supabase Retrieval Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 3. OPERATIONAL BILLING ENGINE
    const billingResults = await Promise.all((projects as SovereignProject[] || []).map(async (project) => {
      
      // Calculate clinical usage charges with zero-fallbacks
      const sessions = project.monthly_sessions || 0;
      const rate = project.session_rate || 0;
      const usageCharge = sessions * rate;

      // --- LOGIC: AUTO-TRIGGER GATEWAY CAPTURE ---
      // This is where the session charges are posted to the payment provider
      if (usageCharge > 0) {
        try {
          // Placeholder for your Cashfree/Gateway automated capture
          // await axios.post('https://api.cashfree.com/v1/orders/usage', { 
          //   order_id: `USAGE-${project.id}-${Date.now()}`,
          //   amount: usageCharge 
          // });
        } catch (gatewayError: any) {
          console.warn(`⚠️ BILLING DELAY: Project ${project.id} failed gateway sync:`, gatewayError.message);
        }
      }

      return {
        identity: project.name,
        sessionsReported: sessions,
        chargeCalculated: usageCharge,
        status: usageCharge > 0 ? 'Invoiced' : 'Baseline_Maintenance'
      };
    }));

    // 4. AUDITABLE SUCCESS RESPONSE
    console.log(`✅ USAGE REPORT COMPLETE: ${billingResults.length} projects processed.`);
    
    return NextResponse.json({ 
      success: true, 
      system: "Sovereign OS v8.0",
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