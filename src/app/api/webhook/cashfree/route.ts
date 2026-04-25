import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

// ⚠️ Uncomment this if you have the WhatsApp file created. 
// If not, leave it commented so your Vercel build doesn't crash.
// import { sendWhatsAppText } from '@/lib/whatsapp'; 

export async function POST(req: Request) {
  try {
    // 1. Extract the raw body and headers for verification
    const rawBody = await req.text();
    const headers = Object.fromEntries(req.headers.entries());
    
    const signature = headers['x-webhook-signature'];
    const timestamp = headers['x-webhook-timestamp'];

    if (!signature || !timestamp) {
      console.warn("Unauthorized: Missing Cashfree signature headers");
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    // 2. Cryptographic Verification (HMAC-SHA256)
    // You MUST add CASHFREE_CLIENT_SECRET to your Vercel Environment Variables
    const secretKey = process.env.CASHFREE_CLIENT_SECRET;
    
    if (!secretKey) {
      throw new Error("CASHFREE_CLIENT_SECRET is missing from environment variables");
    }

    const expectedSignature = crypto
      .createHmac('sha256', secretKey)
      .update(timestamp + rawBody)
      .digest('base64');

    if (expectedSignature !== signature) {
      console.error("CRITICAL: Cashfree Signature Mismatch (Potential Fraud Attempt)");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 3. Parse the verified payload
    const payload = JSON.parse(rawBody);
    
    // Cashfree v3 Webhook structure
    const eventType = payload.type;
    const paymentStatus = payload.data?.payment?.payment_status;
    const orderId = payload.data?.order?.order_id;
    const customerPhone = payload.data?.customer_details?.customer_phone;
    
    // We assume you pass the Database Project ID via Cashfree's 'order_tags'
    const projectId = payload.data?.order?.order_tags?.project_id;

    // 4. Handle Successful Payments
    if (eventType === 'PAYMENT_SUCCESS_WEBHOOK' && paymentStatus === 'SUCCESS') {
      
      if (!projectId) {
        console.error("Payment succeeded, but no project_id was found in order_tags.");
        return NextResponse.json({ error: "Missing project reference" }, { status: 400 });
      }

      // 🔥 Update your Supabase database to unlock the DPR / Service
      const { error: dbError } = await supabase
        .from('projects')
        .update({ 
          billing_active: true, 
          payment_status: 'PAID',
          last_payment_id: payload.data?.payment?.cf_payment_id
        })
        .eq('id', projectId);

      if (dbError) throw dbError;

      console.log(`✅ Payment verified and database updated for project: ${projectId}`);

      // --- 5. INSTANT WHATSAPP CONFIRMATION ---
      // (Uncomment this block when your lib/whatsapp.ts file is ready)
      /*
      if (customerPhone) {
        try {
          await sendWhatsAppText({
            phone: customerPhone,
            message: `✅ Payment received successfully for Order ${orderId}. Your Dialysis DPR is now unlocked and generating.`
          });
        } catch (waError) {
          console.error("WhatsApp notification failed, but payment succeeded:", waError);
        }
      }
      */
    }

    // 6. Return 200 OK to Cashfree
    // If you don't return 200, Cashfree will keep retrying the webhook every few minutes.
    return NextResponse.json({ status: "Webhook Processed Successfully" }, { status: 200 });

  } catch (error: any) {
    console.error("Webhook processing failed:", error);
    // Even on internal failure, returning 500 tells Cashfree to retry later
    return NextResponse.json({ error: "Internal Webhook Error" }, { status: 500 });
  }
}