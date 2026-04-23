export function generateSensitivityMatrix(baseData: any) {
  const volumeVariations = [-0.10, -0.05, 0, 0.05, 0.10]; // -10% to +10% sessions
  const costVariations = [0.10, 0.05, 0, -0.05, -0.10];   // +10% to -10% kit cost

  let matrix = [];

  for (let vVar of volumeVariations) {
    let row = [];
    for (let cVar of costVariations) {
      // Create a modified data object for this specific scenario
      const scenarioData = {
        ...baseData,
        sessionsPerDay: baseData.sessionsPerDay * (1 + vVar),
        // Applying cost variation to the verified ₹455 kit price
        customKitRate: 455 * (1 + cVar) 
      };

      const result = calculateV6Institutional(scenarioData);
      row.push({
        vVar: vVar * 100,
        cVar: cVar * 100,
        irr: result.irr,
        npv: result.npv
      });
    }
    matrix.push(row);
  }

  return matrix;
}