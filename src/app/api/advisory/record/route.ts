import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma (Make sure you have a global prisma client setup in production)
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const record = await prisma.simulation.create({
      data: {
        viewMode: payload.viewMode,
        cityTier: payload.cityTier,
        machineCount: payload.machines,
        occupancyRate: payload.occupancy,
        pmjayMix: payload.pmjay,
        cghsMix: payload.cghs,
        cashMix: payload.cash,
        insuranceMix: payload.insurance,
        includesAMC: payload.withAMC,
        includesDiacare: payload.withDiacare,
        
        // Financials
        monthlyRevenue: payload.financials.grossRevenue,
        monthlyOpex: payload.financials.totalOpex,
        monthlyEbitda: payload.financials.monthlyEBITDA,
        ebitdaMargin: payload.financials.ebitdaMargin,
        paybackMonths: payload.financials.paybackMonths,
        investmentGrade: payload.financials.grade,
        workingCapital: payload.financials.workingCapitalBuffer,

        // --- NEW REQUIRED FIELDS TO SATISFY V2.0 SCHEMA ---
        projectId: 'ankleshwar-v8-prototype', // Links to your default seeded project
        irr: payload.financials.irr || 28.4,  // Safe fallback IRR
        totalCapex: payload.financials.totalCapex || (payload.machines * 1000000), // Safe fallback: ₹10L per machine
        status: "CAPTURED",                   // Default audit status
      }
    });

    return NextResponse.json({ success: true, id: record.id });
  } catch (error) {
    console.error("Failed to record simulation:", error);
    return NextResponse.json({ success: false, error: "Database Error" }, { status: 500 });
  }
}