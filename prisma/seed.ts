import { PrismaClient, MachineZone } from '@prisma/client';

// The engine will now smoothly auto-read the database URL from .env
const prisma = new PrismaClient();

async function main() {
  console.log("🧬 Sovereign OS: Starting unified institutional database seed...\n");

  // ==========================================
  // PART 1: TENANT & FACILITY INFRASTRUCTURE
  // ==========================================
  console.log("🏢 Establishing Multi-Center Architecture...");

  // 1. Establish the Tenant (The Healthcare Group)
  const tenant = await prisma.tenant.upsert({
    where: { id: 'innovate-india-group' },
    update: {}, 
    create: {
      id: 'innovate-india-group',
      name: "Innovate India Healthcare Group",
    },
  });
  console.log(`✅ Tenant verified: ${tenant.name}`);

  // 2. Establish the Facility (The Physical Location)
  // We use a hardcoded ID so the seed script is idempotent (safe to run multiple times)
  const facility = await prisma.facility.upsert({
    where: { id: 'ankleshwar-facility-01' },
    update: {},
    create: {
      id: 'ankleshwar-facility-01',
      tenantId: tenant.id,
      name: "Ankleshwar Urban Dialysis Unit",
      location: "Ankleshwar",
      state: "GUJARAT", // Crucial for PM-JAY Compliance logic
    }
  });
  console.log(`✅ Facility verified: ${facility.name} (${facility.state})`);


  // ==========================================
  // PART 2: ROI CALCULATOR UNDERWRITING DATA
  // ==========================================
  console.log("\n📊 Injecting Underwriting Data...");

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
      name: "Ankleshwar Expansion Plan",
      machines: 15,
      cityTier: 2,
      tdsLevel: 850,
    },
  });
  console.log(`✅ Project verified: ${project.name}`);

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
      monthlyRevenue: 1355000,   
      monthlyOpex: 890000,        
      monthlyEbitda: 465000,      
      ebitdaMargin: 34.3,         
      paybackMonths: 32.2,        
      investmentGrade: "A",       
      workingCapital: 1650000,    
      irr: 28.4,                  
      totalCapex: 15000000,       
      status: "CAPTURED"
    },
  });
  console.log(`✅ Simulation injected: ID ${simulation.id} | Grade: ${simulation.investmentGrade}`);

  // ==========================================
  // PART 3: CLINICAL OS OPERATIONAL BASELINE
  // ==========================================
  console.log("\n🏥 Injecting Clinical OS Execution Baseline...");

  await prisma.shift.createMany({
    skipDuplicates: true,
    data: [
      { id: 'shift-1', shiftName: 'Morning (06:00-10:00)', startTime: new Date('1970-01-01T06:00:00Z'), endTime: new Date('1970-01-01T10:00:00Z') },
      { id: 'shift-2', shiftName: 'Afternoon (11:00-15:00)', startTime: new Date('1970-01-01T11:00:00Z'), endTime: new Date('1970-01-01T15:00:00Z') },
    ]
  });
  console.log(`✅ Shifts verified`);

  await prisma.technician.createMany({
    skipDuplicates: true,
    data: [
      { techId: 'T-01', fullName: 'Rajesh Kumar', isIsolationQualified: true, maxPatientLoad: 4 },
      { techId: 'T-02', fullName: 'Priya Patel', isIsolationQualified: false, maxPatientLoad: 4 },
    ]
  });
  console.log(`✅ Technicians verified`);

  // Create 20 Machines linked to the specific Facility
  const machines = [];
  for(let i=1; i<=20; i++) {
    machines.push({
      facilityId: facility.id, // <--- THE FIX
      machineTag: `M-${i.toString().padStart(2, '0')}`,
      zone: i > 18 ? MachineZone.ISOLATION : MachineZone.GENERAL
    });
  }
  
  await prisma.machine.createMany({
    skipDuplicates: true,
    data: machines
  });
  console.log(`✅ 20 Machines verified and attached to ${facility.name} (Zoned for Infection Control)`);

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