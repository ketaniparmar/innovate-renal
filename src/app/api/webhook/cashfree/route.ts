import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
// ... (import engines and pdf logic)

const CASHFREE_SECRET = process.env.CASHFREE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-webhook-signature");
  const timestamp = req.headers.get("x-webhook-timestamp");

  // --- 1. VERIFY CASHFREE SIGNATURE ---
  const expectedSignature = crypto
    .createHmac("sha256", CASHFREE_SECRET)
    .update(timestamp + rawBody)
    .digest("base64");

  if (expectedSignature !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  // Cashfree successful payment event
  if (event.type !== "PAYMENT_SUCCESS_WEBHOOK") {
    return NextResponse.json({ status: "ignored" });
  }

  try {
    // --- 2. EXTRACT TAGS (The DNA) ---
    const tags = event.data.order.order_tags;
    const phone = event.data.customer_details.customer_phone;

    // --- 3. INSTANT WHATSAPP CONFIRMATION (Friction Killer) ---
    await sendWhatsAppText({
      phone: phone,
      message: "✅ Payment received. Your Dialysis DPR is being generated.\n\nThis report will show:\n• Real monthly profit\n• Hidden leakage\n• Break-even timeline\n\n⏳ Delivery: ~60 seconds"
    });

    // ... (Run SovereignEngine, NarrativeEngine, and Puppeteer PDF generation here)

    // --- 4. DELIVERY & THE HOOK ---
    await sendWhatsAppPDF({ phone, pdf: pdfBuffer });
    
    // Wait 2 minutes, then send Message 3
    setTimeout(async () => {
      await sendWhatsAppText({
        phone: phone,
        message: "Quick note:\n\nIf you want, I can walk you through where your model is leaking money. Most clients recover ₹2–5L/month after optimization.\n\nReply 'CALL' if you want a breakdown."
      });
    }, 120000);

    return NextResponse.json({ status: "success" });

  } catch (err) {
    console.error("CASHFREE WEBHOOK ERROR:", err);
    // Failure Logging
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}