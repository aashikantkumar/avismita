"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Database, Layers, Cloud, Server, Zap, ShieldCheck, Users, Briefcase } from "lucide-react";

const whyCards = [
  { title: "Databricks Expertise", icon: Database, color: "#ff3621", desc: "Unified analytics platform for massive scale." },
  { title: "Snowflake Expertise", icon: Layers, color: "#29b5e8", desc: "Cloud-native data warehousing built for speed." },
  { title: "Microsoft Fabric", icon: ShieldCheck, color: "#0078d4", desc: "Complete analytics platform for the era of AI." },
  { title: "Azure Expertise", icon: Cloud, color: "#0089d6", desc: "Enterprise-grade cloud computing and infrastructure." },
  { title: "AWS Expertise", icon: Server, color: "#ff9900", desc: "Scalable, reliable, and secure global compute." },
  { title: "Startup Agility", icon: Zap, color: "#10b981", desc: "Fast iterations and rapid deployment cycles." },
  { title: "Enterprise Standards", icon: Briefcase, color: "#6366f1", desc: "Robust security, compliance, and governance." },
  { title: "Dedicated Support", icon: Users, color: "#8b5cf6", desc: "Direct access to senior data engineers." },
];

export function WhyAvismita() {
  return (
    <section className="relative w-full bg-[#000000] text-slate-50 py-24 border-t border-white/5 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#000000] to-[#000000] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest mb-4">
              Value Proposition
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-sans">
              Why Avismita
            </h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-slate-950/40 border border-white/10 rounded-2xl p-6 hover:bg-slate-900/60 transition-colors backdrop-blur-sm overflow-hidden"
              >
                {/* Hover gradient background */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${card.color}, transparent 70%)` }}
                />
                
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg border border-white/5"
                  style={{ backgroundColor: `${card.color}15`, color: card.color }}
                >
                  <Icon size={24} />
                </div>
                
                <h4 className="text-lg font-bold text-white mb-2">{card.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
