import { NextResponse } from 'next/server';
import { calculateSovereignV8 } from '@/lib/sovereign-v8-core';

export async function POST(req: Request) {
  const body = await req.json();
  const iterations = 1000;
  const results = [];

  for (let i = 0; i < iterations; i++) {
    // Inject variance (Randomness in occupancy and water quality)
    const simulatedTds = body.tdsLevel * (0.9 + Math.random() * 0.3);
    const simulatedSessions = body.sessionsPerDay * (0.8 + Math.random() * 0.4);

    const run = calculateSovereignV8({
      ...body,
      tdsLevel: simulatedTds,
      sessionsPerDay: simulatedSessions
    });
    results.push(run.irr);
  }

  // Calculate Confidence Intervals
  const sorted = results.sort((a, b) => a - b);
  const p90 = sorted[Math.floor(iterations * 0.1)];
  const p50 = sorted[Math.floor(iterations * 0.5)];

  return NextResponse.json({ p90, p50, fullDistribution: results });
}