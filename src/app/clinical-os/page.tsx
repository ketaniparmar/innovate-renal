"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, ShieldCheck, Server, Users, Activity, 
  TrendingUp, AlertTriangle, CheckCircle2, Lock,
  Stethoscope, BarChart3, Building2, Terminal,
  IndianRupee
} from "lucide-react";
import { saveUserIntent } from "@/utils/intentTracker";

export default function ClinicalOSHubPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowStickyCTA(window.scrollY > window.innerHeight * 0.2);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#0A0F1C] text-slate-200 overflow-x-hidden w-full relative pt-32 pb-24 font-sans">
      
      {/* --- BACKGROUND GLOWS --- */}
      <div className="absolute inset-0 pointer-events-none opacity-50 z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-[#00A8A8]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-[#C6A85A]/10 blur-[150px] rounded-full" />
      </div>

      {/* --- STICKY CONVERSION STRIP --- */}
      <motion.div 
        initial={{ y: -100 }} animate={{ y: showStickyCTA ? 0 : -100 }}
        className="fixed top-24 left-0 w-full z-40 bg-[#0D1525]/80 backdrop-blur-2xl border-b border-white/10 py-3 px-6 hidden md:flex justify-between items-center shadow-2xl"
      >
        <div className="flex items-center gap-3">
          <ShieldCheck size={16} className="text-[#00A8A8]" />
          <p className="text-xs font-black uppercase tracking-widest text-white">
            Zero Infection Risk • Smooth Operations • Perfect Billing
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/calculator">
            <button 
              onClick={() => saveUserIntent("action", "Clicked Sticky Calculate")}
              className="bg-white/5 border border-white/10 text-white px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all hidden lg:block"
            >
              Calculate Your Profit
            </button>
          </Link>
          <Link href="/clinical-os/demo">
            <button 
              onClick={() => saveUserIntent("action", "Clicked Sticky Demo")}
              className="bg-[#C6A85A] text-[#0A0F1C] px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] transition-all shadow-[0_0_15px_rgba(198,168,90,0.3)]"
            >
              See Live Software Demo
            </button>
          </Link>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* --- HERO: PLAIN ENGLISH POSITIONING --- */}
        <section className="mb-24 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#00A8A8]/10 border border-[#00A8A8]/20 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-[#00A8A8] mb-8 shadow-[0_0_15px_rgba(0,168,168,0.15)]"
          >
            <Server size={14}/> Smart Center Management
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.1] mb-8"
          >
            Run Your Dialysis Center <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6A85A] to-[#F1E5AC]">Without the Headaches.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed mb-12 font-medium mx-auto md:mx-0"
          >
            Forget paper records. Our software automatically blocks medical mistakes, manages staff shifts, and <strong className="text-white">guarantees your PM-JAY billing is perfect</strong> so you never lose a claim.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-5 justify-center md:justify-start"
          >
            <Link href="/clinical-os/demo" className="w-full sm:w-auto">
              <button 
                onClick={() => saveUserIntent("action", "Requested System Demo")}
                className="w-full bg-[#C6A85A] text-[#0A0F1C] px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(198,168,90,0.2)]"
              >
                See Live Software Demo <ArrowRight size={16}/>
              </button>
            </Link>
            <Link href="/calculator" className="w-full sm:w-auto">
              <button 
                onClick={() => saveUserIntent("action", "Requested Utilization Calc")}
                className="w-full bg-white/5 border border-white/10 text-white px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                <IndianRupee size={16} className="text-[#00A8A8]"/> Calculate Your Profit
              </button>
            </Link>
          </motion.div>
        </section>

        {/* --- THE THREE PERSONAS (APPLE GLASS CARDS) --- */}
        <section className="mb-32 space-y-12">
          
          {/* Nephrologist */}
          <div className="p-10 md:p-14 rounded-[3rem] bg-gradient-to-br from-[#0D1525] to-[#0A0F1C] border border-[#00A8A8]/20 shadow-[0_20px_50px_rgba(0,168,168,0.05)] backdrop-blur-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A8A8]/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#00A8A8]/20 transition-all duration-700" />
            <div className="flex items-center gap-5 mb-8 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#00A8A8]/10 flex items-center justify-center text-[#00A8A8] border border-[#00A8A8]/20">
                <Stethoscope size={32}/>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00A8A8] mb-1">For Nephrologists</p>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Safe Patient Care. Zero Infection Risk.</h2>
              </div>
            </div>
            <p className="text-base text-gray-400 font-medium mb-10 max-w-3xl relative z-10 leading-relaxed">
              In most centers, safety rules exist on paper—but mistakes still happen. Our system forces staff to follow your medical protocols. It is impossible to skip vital checks or mix up infected patients.
            </p>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
              <ul className="space-y-5">
                <ListItem text="Sessions cannot start until pre-dialysis vitals are entered." />
                <ListItem text="Sessions cannot finish until post-dialysis data is saved." />
                <ListItem text="Infected patients are automatically blocked from general beds." />
                <ListItem text="Every step of the treatment is recorded automatically." />
              </ul>
              <div className="bg-black/20 p-8 rounded-3xl border border-white/5 flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-widest text-[#00A8A8] font-black mb-5">Why Doctors Love It</p>
                <div className="space-y-4 text-sm font-bold text-white">
                  <div className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#00A8A8]"/> Zero risk of cross-infection</div>
                  <div className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#00A8A8]"/> Perfect, automatic patient records</div>
                  <div className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#00A8A8]"/> Total clinical control</div>
                </div>
              </div>
            </div>
          </div>

          {/* Technician */}
          <div className="p-10 md:p-14 rounded-[3rem] bg-gradient-to-br from-[#121626] to-[#0A0F1C] border border-white/10 shadow-2xl backdrop-blur-2xl relative overflow-hidden group">
             <div className="flex items-center gap-5 mb-8 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-gray-300 border border-white/10">
                <Users size={32}/>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">For Dialysis Technicians</p>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Manage Shifts Easily. No More Paperwork.</h2>
              </div>
            </div>
            <p className="text-base text-gray-400 font-medium mb-10 max-w-3xl relative z-10 leading-relaxed">
              On the dialysis floor, speed matters. Stop guessing and tracking beds on paper. This screen tells you exactly who goes on which machine, making your shift easy and stress-free.
            </p>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
              <ul className="space-y-5">
                <ListItem text="See the live status of every machine on one screen." />
                <ListItem text="Get instantly alerted if a patient is assigned to the wrong bed." />
                <ListItem text="Stop writing vitals on paper; enter them directly into the system." />
                <ListItem text="Never lose track of which patient is next." />
              </ul>
              <div className="bg-black/20 p-8 rounded-3xl border border-white/5 flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black mb-5">How It Helps The Staff</p>
                <div className="space-y-4 text-sm font-bold text-white">
                  <div className="flex items-center gap-3"><CheckCircle2 size={20} className="text-gray-300"/> Prevents mistakes before they happen</div>
                  <div className="flex items-center gap-3"><CheckCircle2 size={20} className="text-gray-300"/> Removes stress during busy shifts</div>
                  <div className="flex items-center gap-3"><CheckCircle2 size={20} className="text-gray-300"/> No manual paperwork at the end of the day</div>
                </div>
              </div>
            </div>
          </div>

          {/* Owner / Investor */}
          <div className="p-10 md:p-14 rounded-[3rem] bg-gradient-to-br from-[#1A160C] to-[#0A0F1C] border border-[#C6A85A]/30 shadow-[0_20px_60px_rgba(198,168,90,0.05)] backdrop-blur-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C6A85A]/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-[#C6A85A]/20 transition-all duration-700" />
            <div className="flex items-center gap-5 mb-8 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#C6A85A]/10 flex items-center justify-center text-[#C6A85A] border border-[#C6A85A]/30">
                <IndianRupee size={32}/>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C6A85A] mb-1">For Hospital Owners & Investors</p>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Fill Every Bed. Maximize Your Profit.</h2>
              </div>
            </div>
            <p className="text-base text-gray-400 font-medium mb-10 max-w-3xl relative z-10 leading-relaxed">
              If your machines sit empty, or if PM-JAY claims get rejected because of missing paperwork, you are losing lakhs every month. We track every session and make sure you get paid for it.
            </p>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
              <ul className="space-y-5">
                <ListItem text="See which machines are sitting empty in real-time." color="text-[#C6A85A]" />
                <ListItem text="Every completed session is automatically saved for billing." color="text-[#C6A85A]" />
                <ListItem text="Staff cannot close a session without entering PM-JAY required data." color="text-[#C6A85A]" />
                <ListItem text="Track your daily revenue directly from your phone." color="text-[#C6A85A]" />
              </ul>
              <div className="bg-black/40 p-8 rounded-3xl border border-[#C6A85A]/20 flex flex-col justify-center shadow-inner">
                <p className="text-[10px] uppercase tracking-widest text-[#C6A85A] font-black mb-5">Business & Financial Impact</p>
                <div className="space-y-4 text-sm font-bold text-white">
                  <div className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#C6A85A]"/> Reach 90%+ machine occupancy</div>
                  <div className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#C6A85A]"/> Zero rejected PM-JAY claims</div>
                  <div className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#C6A85A]"/> Protect your monthly profits</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- HOW THE SYSTEM WORKS (CONTINUOUS FLOW) --- */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-sm font-black text-[#C6A85A] uppercase tracking-[0.3em] mb-4">How Our Software Works</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter">From Patient Arrival to Final Billing—<br/>Everything is Automated.</h3>
          </div>

          <div className="grid lg:grid-cols-5 gap-5">
            <FlowStep num="1" title="Smart Bed Booking" desc="Patients are automatically assigned to the right beds. Infection risks are blocked." />
            <FlowStep num="2" title="Mandatory Checks" desc="Staff must enter blood pressure and vitals before the machine turns on." />
            <FlowStep num="3" title="Live Dashboard" desc="See the status of all your machines on one screen. Find empty beds instantly." />
            <FlowStep num="4" title="Final Vitals" desc="When dialysis ends, staff must enter the final health data to close the session." />
            <FlowStep num="5" title="Auto Billing" desc="The session is instantly saved and formatted perfectly for a PM-JAY claim." isLast />
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/clinical-os/technician-portal">
              <button className="bg-transparent border border-[#00A8A8] text-[#00A8A8] px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#00A8A8]/10 transition-all shadow-[0_0_20px_rgba(0,168,168,0.15)]">
                Open The Live Shift Dashboard
              </button>
            </Link>
          </div>
        </section>

        {/* --- DUAL THREAT: ALERTS & REVENUE CONTROL --- */}
        <section className="grid md:grid-cols-2 gap-10 mb-32">
          
          {/* REAL-TIME ALERTS */}
          <div className="bg-red-950/10 border border-red-900/30 rounded-[3rem] p-10 md:p-14 shadow-lg">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center">
                <AlertTriangle className="text-red-500" size={24}/>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Stop Problems Instantly</h3>
            </div>
            <p className="text-base text-gray-400 font-medium mb-8 leading-relaxed">
              The system flashes red and warns your staff before a mistake becomes a disaster.
            </p>
            <div className="space-y-5">
              <AlertItem text="Warning: Patient assigned to wrong bed." />
              <AlertItem text="Warning: Machine has been empty for 20 mins." />
              <AlertItem text="Warning: Pre-dialysis vitals not entered." />
              <AlertItem text="Warning: Cross-infection risk detected." />
            </div>
          </div>

          {/* REVENUE CONTROL LAYER */}
          <div className="bg-[#1A160C] border border-[#C6A85A]/30 rounded-[3rem] p-10 md:p-14 shadow-[0_20px_50px_rgba(198,168,90,0.05)]">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-[#C6A85A]/10 border border-[#C6A85A]/20 rounded-2xl flex items-center justify-center">
                <Lock className="text-[#C6A85A]" size={24}/>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">Never Lose a Billing Claim</h3>
            </div>
            <p className="text-xs text-[#C6A85A] font-black mb-5 uppercase tracking-widest bg-[#C6A85A]/10 w-fit px-3 py-1 rounded">
              Perfect PM-JAY Compliance
            </p>
            <p className="text-base text-gray-400 font-medium mb-8 leading-relaxed">
              If paper records go missing, you don't get paid. Our software makes missing data impossible.
            </p>
            <div className="space-y-5 text-sm font-bold text-white mb-8">
              <div className="flex items-start gap-4"><CheckCircle2 className="text-[#C6A85A] shrink-0 mt-0.5" size={20}/> Staff cannot complete a session without data.</div>
              <div className="flex items-start gap-4"><CheckCircle2 className="text-[#C6A85A] shrink-0 mt-0.5" size={20}/> Every single session is recorded for billing.</div>
              <div className="flex items-start gap-4"><CheckCircle2 className="text-[#C6A85A] shrink-0 mt-0.5" size={20}/> PM-JAY files are auto-generated.</div>
            </div>
          </div>
        </section>

        {/* --- BOTTOM CONVERSION CTA --- */}
        <div className="text-center p-12 md:p-20 rounded-[4rem] bg-[#0D1525] border border-[#C6A85A]/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C6A85A]/5 blur-[120px] rounded-full pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10 tracking-tighter">Ready to upgrade your dialysis center?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-base font-medium relative z-10">
            Stop losing money on empty beds and rejected claims. See how our software can completely transform your daily operations.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 relative z-10">
            <Link href="/clinical-os/demo" className="w-full sm:w-auto">
              <button className="w-full bg-[#C6A85A] text-[#0A0F1C] px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-[#D4B970] transition-all shadow-[0_15px_30px_rgba(198,168,90,0.25)] hover:scale-105 flex items-center justify-center gap-3">
                Play With Our Software <ArrowRight size={16}/>
              </button>
            </Link>
            <Link href="/calculator" className="w-full sm:w-auto">
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3">
                Calculate Your Profit
              </button>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}

// --- SUB-COMPONENTS ---
function ListItem({ text, color = "text-white" }: { text: string, color?: string }) {
  return (
    <li className="flex items-start gap-4">
      <div className={`mt-1.5 bg-white/5 p-1 rounded ${color}`}>
        <ArrowRight size={14} />
      </div>
      <p className="text-base text-gray-300 font-medium leading-relaxed">{text}</p>
    </li>
  );
}

function AlertItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 bg-red-950/40 border border-red-900/50 p-5 rounded-2xl">
      <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0" />
      <p className="text-sm font-bold text-red-200">{text}</p>
    </div>
  );
}

function FlowStep({ num, title, desc, isLast }: { num: string, title: string, desc: string, isLast?: boolean }) {
  return (
    <div className="relative p-8 bg-white/[0.02] border border-white/5 rounded-[2rem] flex flex-col h-full hover:border-[#00A8A8]/40 transition-colors shadow-lg hover:bg-white/[0.04] group">
      <div className="text-4xl font-black text-[#00A8A8]/20 mb-5 group-hover:text-[#00A8A8]/40 transition-colors">{num}</div>
      <h4 className="text-lg font-black text-white mb-3 tracking-tight">{title}</h4>
      <p className="text-sm text-gray-400 font-medium leading-relaxed">{desc}</p>
      {!isLast && (
        <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-white/20 z-10">
          <ArrowRight size={24} />
        </div>
      )}
    </div>
  );
}