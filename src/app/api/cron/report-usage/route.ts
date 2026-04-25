// Run via Cron Job
export async function GET(request: Request) {
  // Security check...
  
  // 1. Fetch sessions from your DB
  const { data: projects } = await supabase.from('projects').select('*').eq('billing_active', true);

  const billingPromises = projects.map(async (project) => {
    const sessionCharge = project.monthly_sessions * project.session_rate;

    // 2. Post an "Add-on" charge for the variable sessions
    return axios.post(`${CF_CONFIG.baseUrl}/subscriptions/${project.subscription_id}/charge`, {
      charge_amount: sessionCharge,
      charge_note: `Usage charge for ${project.monthly_sessions} dialysis sessions`
    }, { headers: CF_CONFIG.headers });
  });

  await Promise.all(billingPromises);
  
  return Response.json({ success: true });
}