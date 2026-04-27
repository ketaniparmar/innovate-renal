// ✅ FIX: Import the active V7 engine from your core library
import { calculateV7Sovereign } from "@/lib/sovereign-engine";

// --- STRICT TYPES (Prevents Vercel Build Crashes) ---
export interface SensitivityBaseData {
  machines: number;
  sessionsPerDay: number;
  downtime: number;
  pmjay: number;
  pvt: number;
  tpa: number;
  state?: string;
  mode?: "single" | "reuse";
  [key: string]: any; // Catch-all to safely pass any extra V8/V9 parameters
}

export interface SensitivityResult {
  vVar: number;
  cVar: number;
  irr: number;
  npv: number;
}

export function generateSensitivityMatrix(baseData: SensitivityBaseData): SensitivityResult[][] {
  const volumeVariations = [-0.10, -0.05, 0, 0.05, 0.10]; // -10% to +10% sessions
  const costVariations = [0.10, 0.05, 0, -0.05, -0.10];   // +10% to -10% kit cost

  let matrix: SensitivityResult[][] = [];

  for (let vVar of volumeVariations) {
    let row: SensitivityResult[] = [];
    
    for (let cVar of costVariations) {
      // Create a modified data object for this specific Monte Carlo scenario
      const scenarioData = {
        ...baseData,
        sessionsPerDay: baseData.sessionsPerDay * (1 + vVar),
        // Applying cost variation to the verified ₹455 kit price
        customKitRate: 455 * (1 + cVar) 
      };

      // ✅ FIX: Replaced the deprecated V6 call with the active V7 engine
      // Wrapped in a try/catch so a math error never breaks the UI
      try {
        const result = calculateV7Sovereign(scenarioData);
        row.push({
          vVar: vVar * 100,
          cVar: cVar * 100,
          irr: result?.irr || 0,
          npv: result?.npv || 0
        });
      } catch (error) {
        // Safe fallback if the engine throws an error on extreme variables
        row.push({
          vVar: vVar * 100,
          cVar: cVar * 100,
          irr: 0,
          npv: 0
        });
      }
    }
    matrix.push(row);
  }

  return matrix;
}