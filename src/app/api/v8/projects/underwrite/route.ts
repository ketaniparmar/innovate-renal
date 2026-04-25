import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { SovereignUnderwriter } from '@/lib/engine/underwriter';
import type { SovereignInputs } from '@/lib/engine/types';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // 🛑 1. Initialize Prisma INSIDE the try block to catch fatal boot errors
    const prisma = new PrismaClient();

    const body: SovereignInputs = await request.json();
    
    // 2. Run Financial Math
    const engine = new SovereignUnderwriter(body);
    const result = engine.evaluate();

    // 3. Ensure Tenant Exists
    await prisma.tenant.upsert({
      where: { id: 'innovate-india-group' },
      update: {},
      create: { id: 'innovate-india-group', name: "Innovate India Group" }
    });

    // 4. Save Project Data
    const project = await prisma.project.upsert({
      where: { 
        id: body.name.toLowerCase().replace(/\s+/g, '-') 
      },
      update: {
        machines: body.machines,
        cityTier: body.cityTier,
        tdsLevel: body.tdsLevel,
      },
      create: {
        id: body.name.toLowerCase().replace(/\s+/g, '-'),
        tenantId: 'innovate-india-group',
        name: result.identity.name,
        machines: body.machines,
        cityTier: body.cityTier,
        tdsLevel: body.tdsLevel,
        simulations: {
          create: {
            irr: result.irr,
            totalCapex: result.capexBreakdown.totalCapex
          }
        }
      }
    });

    return NextResponse.json({
      status: "SUCCESS",
      databaseId: project.id,
      engineResult: result 
    });

  } catch (error: any) {
    console.error("❌ DIAGNOSTIC ROUTE ERROR:", error.message);
    // Returning JSON ensures the frontend doesn't throw the "<!DOCTYPE" error
    return NextResponse.json({ 
      error: "Engine or Database failed to boot", 
      details: error.message 
    }, { status: 500 });
  }
}