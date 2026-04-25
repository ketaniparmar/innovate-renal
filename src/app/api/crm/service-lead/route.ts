import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      facilityName, 
      contactEmail, 
      machines, 
      issueType, 
      systemHealth 
    } = body;

    // 1. Logic to determine Priority
    // If system health is below 80%, we flag as Critical
    const isCritical = systemHealth < 80 || issueType === "RO_FAILURE";

    const leadData = {
      name: facilityName,
      email: contactEmail,
      tags: ["Service_OS", "Sovereign_v7"],
      priority: isCritical ? "HIGH" : "MEDIUM",
      notes: `Service Request for ${machines} machines. Health: ${systemHealth}%. Issue: ${issueType}`,
      timestamp: new Date().toISOString()
    };

    // 2. Push to your CRM (Simulated with console for now)
    console.log("🚀 Pushing Priority Lead to CRM:", leadData);

    // Replace with your actual CRM/Database call
    // await supabase.from('leads').insert([leadData]);

    return NextResponse.json({ 
      success: true, 
      ticketId: `SRV-${Math.floor(Math.random() * 9000) + 1000}` 
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Lead capture failed" }, { status: 500 });
  }
}