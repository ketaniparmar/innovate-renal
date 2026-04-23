import CapexDetailedBreakdown from "@/components/ui/CapexDetailedBreakdown";

export default function CapexPage() {
  return (
    <div className="min-h-screen bg-[#010810] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <CapexDetailedBreakdown />
        
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