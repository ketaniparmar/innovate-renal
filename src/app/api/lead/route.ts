import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma to connect to your PostgreSQL database
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // ====================================================================
    // 1. 🛡️ IRONCLAD DATABASE CAPTURE (Primary Storage)
    // Save the lead directly to your Sovereign Clinical OS database
    // ====================================================================
    const lead = await prisma.lead.create({
      data: {
        location: body.location || "Unknown",
        intentType: body.type || body.intent || "UNKNOWN_INTENT",
        machineCount: body.machines ? parseInt(body.machines) : 0,
        currentCost: body.currentCost || null,
        projectedCapex: body.projectedCapex || null,
        directorName: body.name || null,
        hospitalName: body.hospital || null,
      }
    });

    console.log(`🔥 DB CAPTURE SUCCESS: Lead ID [${lead.id}] saved.`);

    // ====================================================================
    // 2. 🔗 CUSTOM CRM WEBHOOK (Secondary Routing)
    // Silently forward the captured data to Zapier/HubSpot if configured
    // ====================================================================
    const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL; 
    
    if (CRM_WEBHOOK_URL) {
      await fetch(CRM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Innovate India - Sovereign Hub",
          databaseId: lead.id, // Reference to your internal DB
          timestamp: new Date().toISOString(),
          leadData: body
        }),
      }).catch(err => console.error("CRM Webhook failed silently (Lead is still safe in DB)", err));
    }

    return NextResponse.json(
      { success: true, message: "Lead securely captured and routed.", leadId: lead.id },
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