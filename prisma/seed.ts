import { PrismaClient, MachineZone } from '@prisma/client';

// The engine will now smoothly auto-read the database URL from .env
const prisma = new PrismaClient();

async function main() {
  console.log("🧬 Sovereign OS: Starting unified institutional database seed...\n");

  // ==========================================
  // PART 1: ROI CALCULATOR UNDERWRITING DATA
  // ==========================================
  console.log("📊 Injecting Underwriting & Infrastructure Data...");

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
      viewMode: "investor",
      cityTier: "B",
      machineCount: 15,
      occupancyRate: 75.0,
      pmjayMix: 40.0,
      cghsMix: 20.0,
      cashMix: 30.0,
      insuranceMix: 10.0,
      includesAMC: true,
      includesDiacare: true,
      monthlyRevenue: 1355000,    // ₹13.55 Lakhs
      monthlyOpex: 890000,        // ₹8.90 Lakhs
      monthlyEbitda: 465000,      // ₹4.65 Lakhs
      ebitdaMargin: 34.3,         // 34.3% Operating Margin
      paybackMonths: 32.2,        // Capital Recovery Horizon
      investmentGrade: "A",       // Institutional Grade
      workingCapital: 1650000,    // ₹16.5L Survival Buffer
      irr: 28.4,                  // Internal Rate of Return
      totalCapex: 15000000,       // ₹1.5 Cr (Machines + Infra)
      status: "CAPTURED"
    },
  });
  console.log(`✅ Simulation injected: ID ${simulation.id} | Grade: ${simulation.investmentGrade}`);

  // ==========================================
  // PART 2: CLINICAL OS OPERATIONAL BASELINE
  // ==========================================
  console.log("\n🏥 Injecting Clinical OS Execution Baseline...");

  // 4. Create Shifts
  await prisma.shift.createMany({
    skipDuplicates: true,
    data: [
      { id: 'shift-1', shiftName: 'Morning (06:00-10:00)', startTime: new Date('1970-01-01T06:00:00Z'), endTime: new Date('1970-01-01T10:00:00Z') },
      { id: 'shift-2', shiftName: 'Afternoon (11:00-15:00)', startTime: new Date('1970-01-01T11:00:00Z'), endTime: new Date('1970-01-01T15:00:00Z') },
    ]
  });
  console.log(`✅ Shifts verified`);

  // 5. Create Technicians
  await prisma.technician.createMany({
    skipDuplicates: true,
    data: [
      { techId: 'T-01', fullName: 'Rajesh Kumar', isIsolationQualified: true, maxPatientLoad: 4 },
      { techId: 'T-02', fullName: 'Priya Patel', isIsolationQualified: false, maxPatientLoad: 4 },
    ]
  });
  console.log(`✅ Technicians verified`);

  // 6. Create 20 Machines (18 General, 2 Isolation)
  const machines = [];
  for(let i=1; i<=20; i++) {
    machines.push({
      machineTag: `M-${i.toString().padStart(2, '0')}`,
      zone: i > 18 ? MachineZone.ISOLATION : MachineZone.GENERAL
    });
  }
  await prisma.machine.createMany({
    skipDuplicates: true,
    data: machines
  });
  console.log(`✅ 20 Machines verified (Zoned for Infection Control)`);

  console.log("\n🚀 SUCCESS: Full Sovereign OS Architecture (Underwriting + Clinical) is now live.");
}

main()
  .catch((e) => {
    console.error("❌ CRITICAL SEED ERROR:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });