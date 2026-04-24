import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { SovereignUnderwriter } from '@/lib/engine/underwriter';
import type { SovereignInputs } from '@/lib/engine/types';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // 1. Grab the JSON payload from the request
    const body: SovereignInputs = await request.json();

    // 2. Pass to the isolated math engine
    const engine = new SovereignUnderwriter(body);
    const result = engine.evaluate();

    // 3. Save to Supabase via Prisma
    const project = await prisma.project.create({
      data: {
        organizationId: "innovate-india-group", 
        name: result.identity.name,
        location: result.identity.location,
        machines: body.machines,
        beds: body.beds,
        cityTier: body.cityTier,
        tdsLevel: body.tdsLevel,
        mode: body.mode,
        pmjayPct: body.pmjayPct,
        pvtPct: body.pvtPct,
        
        audits: {
          create: {
            totalCapex: result.capex,
            annualEbitda: result.ebitda,
            irr: result.irr,
            dscr: result.dscr,
            creditRating: result.rating,
            npv: 0
          }
        }
      },
      include: { audits: true }
    });

    // Inside src/app/api/v8/projects/underwrite/route.ts (bottom of the POST function)

    // 4. Return success to the frontend
    return NextResponse.json({
      status: "SUCCESS",
      message: `Project ${project.name} underwritten successfully.`,
      data: project,
      engineResult: result // <--- ADD THIS LINE
    });
  } catch (error) {
    console.error("Underwriting Error:", error);
    return NextResponse.json({ error: "Failed to process underwriting" }, { status: 500 });
  }
}