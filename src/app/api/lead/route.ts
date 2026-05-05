import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Ensure we have an ID. If the frontend didn't send one (e.g., standard contact form), 
    // generate one securely on the server.
    const leadId = body.leadId || crypto.randomUUID();

    // Extract headers for additional lead intelligence
    const userAgent = request.headers.get("user-agent") || "Unknown";
    const ipAddress = request.headers.get("x-forwarded-for") || "Unknown";

    // ====================================================================
    // 🛡️ THE UPSERT ENGINE (Deduplication & Offline Retry Safety)
    // ====================================================================
    const lead = await prisma.lead.upsert({
      where: { 
        id: leadId 
      },
      update: {
        // If the lead already exists (a retry fired), just update the timestamp
        updatedAt: new Date(),
      },
      create: {
        id: leadId,
        location: body.location || "Unknown",
        intentType: body.type || body.intent || "UNKNOWN_INTENT",
        machineCount: body.machines ? parseInt(body.machines) : 0,
        currentCost: body.currentCost ? parseFloat(body.currentCost) : null,
        projectedCapex: body.projectedCapex ? parseFloat(body.projectedCapex) : null,
        directorName: body.name || null,
        hospitalName: body.hospital || null,
        status: "WHATSAPP_INITIATED", // Precise funnel tagging
        userAgent: userAgent,
        ipAddress: ipAddress,
        createdAt: body.timestamp ? new Date(body.timestamp) : new Date(),
      }
    });

    console.log(`🔥 LEAD SECURED: [${lead.intentType}] ID: ${lead.id}`);

    // ====================================================================
    // 🔗 ASYNC CRM SYNC (Non-Blocking)
    // ====================================================================
    const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL; 
    if (CRM_WEBHOOK_URL) {
      // We don't await this so it doesn't slow down the client's timeout window
      fetch(CRM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "lead_captured",
          leadId: lead.id,
          payload: lead
        }),
      }).catch(err => console.error("Silent CRM webhook failure", err));
    }

    return NextResponse.json(
      { success: true, message: "Lead captured safely.", leadId: lead.id },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Lead Engine Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error during capture." },
      { status: 500 }
    );
  }
}