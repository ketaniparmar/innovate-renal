import { NextResponse } from 'next/server';
// ✅ FIX 1: Import the newly created Underwriter Inputs directly from the engine file
import { SovereignUnderwriter, SovereignUnderwriterInputs } from '@/lib/engine/underwriter';
// (Remove the old 'import type { SovereignInputs }' if it's still at the top of your file)

export async function POST(req: Request) {
  try {
    // ✅ FIX 2: Tell TypeScript that the incoming body matches the new, expanded blueprint
    const body: SovereignUnderwriterInputs = await req.json();

    // 1. Run Financial Math (Passed safely to the engine)
    const engine = new SovereignUnderwriter(body);
    const result = engine.evaluate();

    // 2. Return the evaluated metrics
    return NextResponse.json(result);
    
  } catch (error: any) {
    console.error("Underwrite API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}