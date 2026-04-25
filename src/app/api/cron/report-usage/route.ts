// src/app/api/cron/report-usage/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
// import axios from 'axios'; // ⚠️ Commented out until you write the actual Cashfree/Gateway logic to prevent "unused variable" build crashes.

// ✅ 1. EXPLICIT INTERFACE: Tells TypeScript exactly what the database returns
interface ActiveProject {
  id: string;
  monthly_sessions?: number | null;
  session_rate?: number | null;
}

export async function GET(req: Request) {
  try {
    // 1. Fetch active projects from your DB
    const { data: projects, error } = await supabase
      .from('projects')
      .select('id, monthly_sessions, session_rate')
      .eq('billing_active', true);

    if (error) {
      console.error("Supabase Query Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. Process Billing Safely (No "any" types)
    const billingPromises = (projects as ActiveProject[] || []).map(async (project) => {
      
      // Calculate variable session charges safely with zero-fallbacks
      const sessions = project.monthly_sessions || 0;
      const rate = project.session_rate || 0;
      const sessionCharge = sessions * rate;

      // TODO: Post the "Add-on" charge to your payment gateway here using Axios
      /* if (sessionCharge > 0) {
        await axios.post('https://api.cashfree.com/...', { amount: sessionCharge }); 
      }
      */

      return {
        projectId: project.id,
        sessionsReported: sessions,
        chargeCalculated: sessionCharge,
        status: sessionCharge > 0 ? 'Charge_Pending' : 'Zero_Balance'
      };
    });

    // Wait for all billing calculations to finish
    const results = await Promise.all(billingPromises);

    // 3. Return a clean, auditable success response
    return NextResponse.json({ 
      success: true, 
      message: "Usage reported and calculated successfully",
      processedCount: results.length,
      data: results 
    }, { status: 200 });

  } catch (error: any) {
    console.error("Cron Execution Failed:", error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || "Internal Server Error" 
    }, { status: 500 });
  }
}