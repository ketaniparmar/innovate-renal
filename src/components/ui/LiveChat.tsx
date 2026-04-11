"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-80 md:w-96 glass rounded-3xl border-white/10 overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-brand-blue p-6 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg"><Bot size={20} /></div>
                <div>
                  <p className="font-bold text-sm">Innovate AI</p>
                  <p className="text-[10px] opacity-80 uppercase tracking-tighter font-bold">Online • Support & Sales</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={20} /></button>
            </div>

            {/* Chat Content */}
            <div className="h-80 p-6 overflow-y-auto space-y-4 bg-brand-dark/50">
              <div className="glass p-3 rounded-2xl rounded-tl-none text-xs border-white/5 max-w-[80%]">
                Hello! I am the Innovate India concierge. Are you looking for clinical equipment, or do you need technical service for an existing machine?
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 flex gap-2">
              <input type="text" placeholder="Ask a question..." className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs outline-none focus:border-brand-blue" />
              <button className="p-2 bg-brand-blue rounded-full text-white"><Send size={14} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-[0_10px_40px_rgba(0,122,255,0.4)] border border-white/20"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}