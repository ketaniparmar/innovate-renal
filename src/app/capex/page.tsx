'use client'; // This tells Next.js we need interactivity here

import { useEffect, useState } from "react";
import CapexDetailedBreakdown from "@/components/ui/CapexDetailedBreakdown";

export default function CapexPage() {
  const [capexData, setCapexData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function runUnderwriting() {
      try {
        const response = await fetch('/api/v8/projects/underwrite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: "Ankleshwar Urban Dialysis Unit",
            location: "Ankleshwar, Gujarat",
            machines: 15,
            beds: 0,
            cityTier: 2,
            tdsLevel: 850,
            mode: "reuse",
            pmjayPct: 60,
            pvtPct: 40
          })
        });

        const json = await response.json();
        
        // If the API returns successfully, feed the breakdown into the UI
        if (json.engineResult && json.engineResult.capexBreakdown) {
          setCapexData(json.engineResult.capexBreakdown);
        }
      } catch (error) {
        console.error("Failed to connect to Sovereign Engine:", error);
      } finally {
        setIsLoading(false);
      }
    }

    runUnderwriting();
  }, []);

  return (
    <div className="min-h-screen bg-[#010810] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Pass the dynamically fetched data to our dumb component */}
        <CapexDetailedBreakdown data={capexData} />
        
        <div className="mt-12 p-8 bg-blue-500/5 border border-blue-500/20 rounded-3xl">
          <h4 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4 italic">Strategic Insight</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            This CAPEX model is dynamically synchronized with your Sovereign OS sessions. As you scale beyond 12 machines, the system automatically adjusts the <strong>RO Plant capacity</strong> and <strong>Infrastructure buffers</strong> to meet NABH standards.
          </p>
        </div>
      </div>
    </div>
  );
}