import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Extract the exact data the hospital owner submitted
    const { name, hospital, location, machines, intent, budget, message } = body;

    // ====================================================================
    // 🔗 YOUR CUSTOM CRM WEBHOOK GOES HERE
    // Replace this URL with your actual Innovate India CRM/Zapier endpoint
    // ====================================================================
    const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL || "https://hooks.zapier.com/hooks/catch/your-id/";

    /*
    await fetch(CRM_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "Innovate India - Sovereign Hub",
        timestamp: new Date().toISOString(),
        leadData: body
      }),
    });
    */

    // Log for local testing
    console.log("🔥 HIGH-TICKET LEAD CAPTURED:", body);

    return NextResponse.json(
      { success: true, message: "Lead successfully routed to CRM." },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Routing Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to process lead." },
      { status: 500 }
    );
  }
}