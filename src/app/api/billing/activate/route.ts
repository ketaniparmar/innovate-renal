import axios from 'axios';

const CF_CONFIG = {
  baseUrl: process.env.CASHFREE_BASE_URL, // https://api.cashfree.com/v2 or sandbox
  headers: {
    'x-client-id': process.env.CASHFREE_APP_ID,
    'x-client-secret': process.env.CASHFREE_SECRET_KEY,
    'Content-Type': 'application/json',
  },
};

export async function POST(req: Request) {
  const { projectId, pricingConfig } = await req.json();
  /* pricingConfig = { 
       baseRate: 15000, 
       machineCount: 15, 
       sessionRate: 10,
       customerName: "Dr. Sharma Dialysis Center",
       customerEmail: "sharma.clinic@gmail.com",
       customerPhone: "9876543210"
     } 
  */

  try {
    // 1. Calculate the Fixed Monthly Component
    // (Base Fee + (Machines * Per Machine Rate))
    const fixedMonthlyAmount = pricingConfig.baseRate + (pricingConfig.machineCount * 1000);

    // 2. Create the Subscription Plan dynamically (or use a pre-existing one)
    // We create a plan for this specific facility to lock in their unique fixed rate.
    const planResponse = await axios.post(`${CF_CONFIG.baseUrl}/subscription-plans`, {
      plan_id: `plan_project_${projectId}`,
      plan_name: `Innovate IndAI - ${pricingConfig.customerName}`,
      plan_type: "PERIODIC",
      plan_currency: "INR",
      plan_intervals: [{
        interval_type: "MONTH",
        interval_count: 1,
        subscription_amount: fixedMonthlyAmount
      }]
    }, { headers: CF_CONFIG.headers });

    // 3. Create the Subscription Instance
    const subscriptionResponse = await axios.post(`${CF_CONFIG.baseUrl}/subscriptions`, {
      subscription_id: `sub_${projectId}_${Date.now()}`,
      plan_id: planResponse.data.plan_id,
      customer_details: {
        customer_name: pricingConfig.customerName,
        customer_email: pricingConfig.customerEmail,
        customer_phone: pricingConfig.customerPhone
      },
      subscription_expiry_date: "2030-12-31 23:59:59",
      subscription_first_charge_time: new Date().toISOString().replace('T', ' ').split('.')[0],
      metadata: {
        projectId: projectId,
        sessionRate: pricingConfig.sessionRate // Stored for later metered calculation
      }
    }, { headers: CF_CONFIG.headers });

    // 4. Return the Payment Link for mandate authorization
    return Response.json({ 
      checkoutUrl: subscriptionResponse.data.sub_payment_link 
    });

  } catch (error: any) {
    console.error('Cashfree Error:', error.response?.data || error.message);
    return Response.json({ error: "Subscription Initialization Failed" }, { status: 500 });
  }
}