import { NextResponse } from "next/server";
import { PrismaClient, SessionState, PayerType } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      sessionId, 
      postBpSystolic, 
      postBpDiastolic, 
      postWeightKg, 
      ufRemovedMl 
    } = body;

    // ==========================================
    // 1. THE CLINICAL STATE GUARD
    // ==========================================
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { patient: true, machine: true, clinicalData: true }
    });

    if (!session) {
      return NextResponse.json({ success: false, message: "Session not found." }, { status: 404 });
    }

    if (session.currentState !== SessionState.IN_PROGRESS) {
      return NextResponse.json({ 
        success: false, 
        message: `IMMUTABILITY_VIOLATION: Cannot complete session currently in ${session.currentState} state.` 
      }, { status: 400 });
    }

    // ==========================================
    // 2. THE PM-JAY REVENUE FIREWALL
    // ==========================================
    // If fluid removed (UF) is missing, the government will reject the claim. 
    // We block it at the edge.
    if (ufRemovedMl === undefined || ufRemovedMl === null || ufRemovedMl < 0) {
      return NextResponse.json({ 
        success: false, 
        message: "CLINICAL_GUARD_FAILURE: Exact UF Removed (ml) is mandatory for billing validation. Session cannot be closed." 
      }, { status: 400 });
    }

    if (!postBpSystolic || !postBpDiastolic) {
      return NextResponse.json({ 
        success: false, 
        message: "CLINICAL_GUARD_FAILURE: Post-Dialysis Blood Pressure is mandatory." 
      }, { status: 400 });
    }

    // ==========================================
    // 3. ATOMIC DATABASE COMMIT
    // ==========================================
    // We use a transaction to update the clinical records and advance the State Machine simultaneously.
    await prisma.$transaction([
      prisma.clinicalData.upsert({
        where: { sessionId: sessionId },
        update: {
          postBpSystolic,
          postBpDiastolic,
          postWeightKg,
          ufRemovedMl,
        },
        create: {
          sessionId,
          postBpSystolic,
          postBpDiastolic,
          postWeightKg,
          ufRemovedMl,
        }
      }),
      prisma.session.update({
        where: { id: sessionId },
        data: { currentState: SessionState.COMPLETED }
      })
    ]);

    // ==========================================
    // 4. REVENUE ROUTING & REALIZATION
    // ==========================================
    let realizedYield = 0;
    let billingStatus = "";
    let generatedPayload = null;

    if (session.patient.payerType === PayerType.PM_JAY) {
      realizedYield = 1800; // Standard PM-JAY Hemodialysis Package Rate
      billingStatus = "CLAIM_READY_FOR_SUBMISSION";
      // Generate the exact JSON shape the government portal API expects
      generatedPayload = {
        uhid: session.patient.uhid,
        procedureCode: "PMJAY-HD-01",
        clinicalEvidence: {
          preWeight: session.clinicalData?.preWeightKg || null,
          postWeight: postWeightKg,
          ufRemoved: ufRemovedMl,
          machineId: session.machine.machineTag
        }
      };
    } else if (session.patient.payerType === PayerType.PRIVATE) {
      realizedYield = 2200; // Standard Private Rate
      billingStatus = "INVOICE_GENERATED";
    }

    return NextResponse.json({
      success: true,
      message: "Session successfully completed and transitioned to billing.",
      executionData: {
        sessionId: session.id,
        newState: "COMPLETED",
        machineStatus: "SHIFTED_TO_CLEANING_PROTOCOL"
      },
      revenueData: {
        payer: session.patient.payerType,
        realizedValue: `₹${realizedYield}`,
        status: billingStatus,
        claimPayload: generatedPayload
      }
    });

  } catch (error: any) {
    console.error("[Clinical OS] Execution Engine Failure:", error);
    return NextResponse.json({ 
      success: false, 
      message: "System encountered an error during state transition.",
      error: error.message
    }, { status: 500 });
  }
}