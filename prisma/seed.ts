import { PrismaClient } from '@prisma/client';

// The engine will now smoothly auto-read the %21 password from .env
const prisma = new PrismaClient();

async function main() {
  console.log("🧬 Sovereign OS: Starting institutional database seed...\n");

  const tenant = await prisma.tenant.upsert({
    where: { id: 'innovate-india-group' },
    update: {},
    create: {
      id: 'innovate-india-group',
      name: "Innovate India Healthcare Group",
    },
  });
  
  const project = await prisma.project.upsert({
    where: { id: 'ankleshwar-v8-prototype' },
    update: {},
    create: {
      id: 'ankleshwar-v8-prototype',
      tenantId: tenant.id,
      name: "Ankleshwar Urban Dialysis Unit (V8 Prototype)",
      machines: 15,
      cityTier: 2,
      tdsLevel: 850,
    },
  });

  const simulation = await prisma.simulation.create({
    data: {
      projectId: project.id,
      irr: 28.4,
      totalCapex: 18500000,
    },
  });

  console.log("🚀 SUCCESS: Infrastructure data is now live in Supabase.");
}

main()
  .catch((e) => {
    console.error("❌ CRITICAL SEED ERROR:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });