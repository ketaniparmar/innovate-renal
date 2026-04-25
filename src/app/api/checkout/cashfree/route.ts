// src/app/api/checkout/cashfree/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const orderId = `order_${Date.now()}`;

    const options = {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': process.env.CASHFREE_APP_ID!,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY!
      },
      body: JSON.stringify({
        order_amount: 9999.00,
        order_currency: "INR",
        order_id: orderId,
        customer_details: {
          customer_id: data.phone, // using phone as clean ID
          customer_name: data.name,
          customer_phone: data.phone,
        },
        order_meta: {
          // This must match your live domain later
          notify_url: "https://yourdomain.com/api/webhook/cashfree" 
        },
        order_tags: {
          machines: data.machines?.toString() || "0",
          sessions: data.sessions?.toString() || "0",
          downtime: data.downtime?.toString() || "0",
          state: data.state || "Unknown",
          pmjay: data.pmjay?.toString() || "0",
          private: data.privateMix?.toString() || "0",
          tpa: data.tpa?.toString() || "0"
        }
      })
    };

    // Note: Use https://sandbox.cashfree.com/pg/orders for testing
    // Use https://api.cashfree.com/pg/orders for LIVE production
    const response = await fetch('https://api.cashfree.com/pg/orders', options);
    const cashfreeData = await response.json();

    if (!response.ok) throw new Error(cashfreeData.message);

    return NextResponse.json({ payment_session_id: cashfreeData.payment_session_id });

  } catch (error: any) {
    console.error("Cashfree Order Creation Failed:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}