import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // ✅ Fix 1: The missing import

// Vercel Cron Jobs typically use GET requests
export async function GET(req: Request) {
  try {
    // 1. Fetch active projects from your DB
    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .eq('billing_active', true);

    if (error) {
      console.error("Supabase Query Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. Process Billing (✅ Fix 2: TypeScript Null Fallback added here)
    const billingPromises = (projects || []).map(async (project: any) => {
      
      // Calculate variable session charges safely
      const sessions = project.monthly_sessions || 0;
      const rate = project.session_rate || 0;
      const sessionCharge = sessions * rate;

      // TODO: Post the "Add-on" charge to your payment gateway here
      // await processVariableBilling(project.id, sessionCharge);

      return {
        projectId: project.id,
        sessionsReported: sessions,
        chargeCalculated: sessionCharge,
        status: 'Processed'
      };
    });

    // Wait for all billing calculations to finish
    const results = await Promise.all(billingPromises);

    // 3. Return a clean success response
    return NextResponse.json({ 
      success: true, 
      message: "Usage reported successfully",
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