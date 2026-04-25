import { NextResponse } from 'next/server';
import { SovereignUnderwriter, SovereignUnderwriterInputs } from '@/lib/engine/underwriter';

export async function POST(req: Request) {
  try {
    const body: SovereignUnderwriterInputs = await req.json();

    // ✅ Ensure defaults for missing V7 fields to satisfy V8 Engine
    const finalizedBody: SovereignUnderwriterInputs = {
      ...body,
      beds: body.beds || Math.ceil(body.machines * 1.2), // Fallback logic
      cityTier: body.cityTier || 2,
      tdsLevel: body.tdsLevel || 800
    };

    const engine = new SovereignUnderwriter(finalizedBody);
    const result = engine.evaluate();

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}