import { GUJARAT_CITIES } from "@/lib/locations";
import { MapPin } from "lucide-react";

export default function ServiceAreas() {
  return (
    <section className="py-20 bg-black/50 border-t border-white/5">
      <div className="container mx-auto px-6">
        <h3 className="text-brand-gold font-mono text-xs uppercase tracking-[0.3em] mb-8 text-center">Regional Presence</h3>
        <h2 className="text-3xl font-bold text-center mb-12">Serving every corner of <span className="text-gradient-gold">Gujarat.</span></h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {GUJARAT_CITIES.map((city) => (
            <div key={city} className="glass p-4 rounded-xl border-white/5 hover:border-brand-gold/30 transition-all flex items-center gap-3 group cursor-default">
              <MapPin size={14} className="text-brand-gold group-hover:animate-bounce" />
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{city}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}