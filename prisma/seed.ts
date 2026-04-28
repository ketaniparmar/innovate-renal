import { PrismaClient } from '@prisma/client';

// The engine will now smoothly auto-read the %21 password from .env
const prisma = new PrismaClient();

async function main() {
  console.log("🧬 Sovereign OS: Starting institutional database seed...\n");

  // 1. Establish the Tenant (The Healthcare Group)
  const tenant = await prisma.tenant.upsert({
    where: { id: 'innovate-india-group' },
    update: {}, // Leave untouched if it exists
    create: {
      id: 'innovate-india-group',
      name: "Innovate India Healthcare Group",
    },
  });
  console.log(`✅ Tenant verified: ${tenant.name}`);

  // 2. Establish the Project (The Specific Infrastructure)
  const project = await prisma.project.upsert({
    where: { id: 'ankleshwar-v8-prototype' },
    update: {
      machines: 15,
      cityTier: 2,
      tdsLevel: 850,
    },
    create: {
      id: 'ankleshwar-v8-prototype',
      tenantId: tenant.id,
      name: "Ankleshwar Urban Dialysis Unit (V8 Prototype)",
      machines: 15,
      cityTier: 2,
      tdsLevel: 850,
    },
  });
  console.log(`✅ Project verified: ${project.name}`);

  // 3. Inject a Full V2.0 Underwriting Simulation
  const simulation = await prisma.simulation.create({
    data: {
      projectId: project.id,
      
      // User Profile Context
      viewMode: "investor",
      cityTier: "B",
      
      // Clinical Inputs (The Scale)
      machineCount: 15,
      occupancyRate: 75.0,
      pmjayMix: 40.0,
      cghsMix: 20.0,
      cashMix: 30.0,
      insuranceMix: 10.0,
      
      // Strategy Toggles
      includesAMC: true,
      includesDiacare: true,

      // Financial Underwriting Outputs (The Intelligence)
      monthlyRevenue: 1355000,    // ₹13.55 Lakhs
      monthlyOpex: 890000,        // ₹8.90 Lakhs
      monthlyEbitda: 465000,      // ₹4.65 Lakhs
      ebitdaMargin: 34.3,         // 34.3% Operating Margin
      paybackMonths: 32.2,        // Capital Recovery Horizon
      investmentGrade: "A",       // Institutional Grade
      workingCapital: 1650000,    // ₹16.5L Survival Buffer (Death Valley)
      
      // High-Level Overrides
      irr: 28.4,                  // Internal Rate of Return
      totalCapex: 15000000,       // ₹1.5 Cr (Machines + Infra)
      
      status: "CAPTURED"
    },
  });
  console.log(`✅ Simulation injected: ID ${simulation.id} | Grade: ${simulation.investmentGrade}`);

  console.log("\n🚀 SUCCESS: Full V2.0 Infrastructure data is now live in Supabase.");
}

main()
  .catch((e) => {
    console.error("❌ CRITICAL SEED ERROR:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });