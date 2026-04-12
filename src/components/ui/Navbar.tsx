"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Sales", href: "/sales" },
    { name: "Service", href: "/service" },
    { name: "Solutions", href: "/solutions" },
    { name: "AI Tools", href: "/tools" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-[#010810]/70">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#D4AF37] rounded flex items-center justify-center font-bold text-black shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-transform">
            I
          </div>
          <span className="font-bold tracking-tight text-xl text-white">
            Innovate <span className="text-[#D4AF37]">India</span>
          </span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em]">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`transition-colors hover:text-white ${pathname === link.href ? 'text-[#D4AF37]' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Global CTA */}
        <div className="flex items-center gap-4">
          <button className="hidden lg:block text-[10px] text-gray-400 hover:text-white uppercase tracking-widest font-bold transition-colors">
            Client Login
          </button>
          <Link href="/contact" className="glass px-6 py-2.5 rounded-full text-[10px] font-bold text-white uppercase border border-white/10 hover:bg-white/5 transition-all">
            Get Quote
          </Link>
        </div>
      </div>
    </nav>
  );
}