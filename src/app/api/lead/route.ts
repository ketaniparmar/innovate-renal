import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // TODO: Connect this to your Prisma/Supabase DB
    // await prisma.lead.create({ data: body });
    
    console.log("✅ Institutional Lead Captured:", body);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}