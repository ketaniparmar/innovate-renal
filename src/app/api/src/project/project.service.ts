import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// We import the math engine we built in Step 4
import { SovereignUnderwriter, SovereignInputs } from '@sovereign/engine'; 

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async processUnderwriting(dto: SovereignInputs) {
    // 1. Initialize the Engine
    const engine = new SovereignUnderwriter(dto);
    
    // 2. Compute everything in memory (0ms latency)
    const result = engine.evaluate();

    // 3. Save the physical project to the database
    const project = await this.prisma.project.create({
      data: {
        organizationId: "innovate-india-group", // Fixed tenant for now
        name: result.identity.name,
        location: result.identity.location,
        machines: dto.machines,
        beds: dto.beds,
        cityTier: dto.cityTier,
        tdsLevel: dto.tdsLevel,
        mode: dto.mode,
        pmjayPct: dto.pmjayPct,
        pvtPct: dto.pvtPct,
        
        // 4. Save the computed financial snapshot linked to this project
        audits: {
          create: {
            totalCapex: result.capex,
            annualEbitda: result.ebitda,
            irr: result.irr,
            dscr: result.dscr,
            creditRating: result.rating,
            npv: 0 // Placeholder for full Newton-Raphson implementation later
          }
        }
      },
      include: { audits: true } // Return the saved audit to the frontend
    });

    return {
      status: "SUCCESS",
      message: `Project ${project.name} underwritten successfully.`,
      data: project
    };
  }
}