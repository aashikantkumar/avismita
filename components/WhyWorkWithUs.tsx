"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserPlus, MessageSquare, Award, ShieldCheck, Coins } from "lucide-react";

const reasons = [
  {
    title: "Direct Founder Involvement",
    desc: "Work directly with engineering leadership without layers of account managers.",
    icon: UserPlus,
    color: "#3b82f6" // blue
  },
  {
    title: "Faster Communication",
    desc: "Agile processes and direct channels ensure rapid response and iteration times.",
    icon: MessageSquare,
    color: "#10b981" // emerald
  },
  {
    title: "Technical Excellence",
    desc: "Deep expertise in modern data stacks ensures future-proof, scalable architectures.",
    icon: Award,
    color: "#8b5cf6" // purple
  },
  {
    title: "Enterprise Standards",
    desc: "We apply rigorous security, compliance, and quality checks to every deployment.",
    icon: ShieldCheck,
    color: "#f43f5e" // rose
  },
  {
    title: "Cost Effective",
    desc: "Lean operations and smart cloud architecture maximize your ROI.",
    icon: Coins,
    color: "#eab308" // yellow
  }
];

export function WhyWorkWithUs() {
  return (
    <section className="relative w-full bg-[#000000] text-slate-50 py-20 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest mb-4">
              Our Advantage
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-sans">
              Why Work With Us
            </h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            // Make the last item span 2 columns on tablet, or just center it on large screens if there's 5 items.
            // Since there are 5 items, we can let them wrap naturally.
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative bg-slate-950/40 border border-white/10 rounded-2xl p-8 hover:bg-slate-900/60 transition-all backdrop-blur-sm group overflow-hidden ${
                  idx === 3 ? "lg:col-start-1 lg:ml-auto lg:w-full lg:max-w-md" : ""
                } ${
                  idx === 4 ? "lg:col-start-2 lg:mr-auto lg:w-full lg:max-w-md" : ""
                }`}
              >
                <div 
                  className="absolute top-0 right-0 w-32 h-32 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ backgroundColor: reason.color }}
                />
                
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg border border-white/5"
                  style={{ backgroundColor: `${reason.color}15`, color: reason.color }}
                >
                  <Icon size={24} />
                </div>
                
                <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{reason.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {reason.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
