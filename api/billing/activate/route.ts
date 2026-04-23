import Stripe from 'cashfree';
const stripe = new Stripe(process.env.cashfree_SECRET_KEY!);

export async function POST(req: Request) {
  const { projectId, pricingConfig } = await req.json();
  // pricingConfig = { baseRate: 15000, machineCount: 15, sessionRate: 10 }

  // 1. Create the Customer
  const customer = await stripe.customers.create({
    name: "Dr. Sharma Dialysis Center",
    metadata: { projectId: projectId }
  });

  // 2. Build the Subscription payload
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      { price: 'price_base_fee_id' }, // Flat rate
      { price: 'price_machine_fee_id', quantity: pricingConfig.machineCount }, // Fixed quantity
      { price: 'price_session_metered_id' } // Metered (Quantity reported at month-end)
    ],
    metadata: { statePolicy: 'single_use' }
  });

  // 3. Generate Checkout Link for mandate approval
  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    mode: 'setup', // Setting up a mandate for future recurring charges
    success_url: 'https://innovate-india.com/dashboard?billing=success',
  });

  return Response.json({ checkoutUrl: session.url });
}