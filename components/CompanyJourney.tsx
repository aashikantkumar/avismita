"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Milestone, Cpu, Building2 } from "lucide-react";

const journeySteps = [
  {
    year: "Experience",
    title: "Deep Engineering Roots",
    description: "Years of hands-on experience architecting and deploying complex data pipelines, data lakes, and warehouses for global enterprises.",
    icon: Briefcase,
    color: "#3b82f6" // blue
  },
  {
    year: "Consulting Journey",
    title: "Solving Hard Problems",
    description: "Transitioned to specialized consulting to help organizations navigate the complexities of modern data stack migrations and optimizations.",
    icon: Milestone,
    color: "#10b981" // emerald
  },
  {
    year: "Technologies",
    title: "Platform Mastery",
    description: "Built extensive expertise across Databricks, Snowflake, Microsoft Fabric, Azure, and AWS to deliver cloud-native, scalable solutions.",
    icon: Cpu,
    color: "#8b5cf6" // purple
  },
  {
    year: "Industries Served",
    title: "Cross-Domain Impact",
    description: "Delivering high-value data analytics solutions across finance, healthcare, retail, and technology sectors globally.",
    icon: Building2,
    color: "#f43f5e" // rose
  }
];

export function CompanyJourney() {
  return (
    <section className="relative w-full bg-[#000000] text-slate-50 py-24 border-t border-white/5 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest mb-4">
              Our Path
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-sans">
              Company Journey
            </h3>
          </motion.div>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {journeySteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative flex flex-col md:flex-row items-center justify-between md:h-48 group">
                  
                  {/* Left Content (or empty for odd) */}
                  <div className={`w-full md:w-[45%] flex ${isEven ? "md:justify-end text-left md:text-right" : "md:justify-start md:order-3 text-left"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="bg-slate-950/60 border border-white/10 p-6 rounded-2xl backdrop-blur-sm w-full relative overflow-hidden group-hover:border-white/20 transition-colors"
                    >
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                        style={{ background: `radial-gradient(circle at ${isEven ? '100%' : '0%'} 50%, ${step.color}, transparent 70%)` }}
                      />
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest mb-2 block" style={{ color: step.color }}>
                        {step.year}
                      </span>
                      <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{step.title}</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-4 md:left-1/2 top-6 md:top-1/2 -translate-y-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full border border-white/10 bg-slate-950 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,0,0,0.5)] md:order-2 hidden md:flex">
                    <Icon size={18} style={{ color: step.color }} />
                    {/* Pulse ring */}
                    <div 
                      className="absolute inset-0 rounded-full border border-white/20 opacity-0 group-hover:animate-ping pointer-events-none" 
                      style={{ borderColor: step.color }}
                    />
                  </div>

                  {/* Empty space for alignment */}
                  <div className={`hidden md:block w-[45%] ${isEven ? "md:order-3" : "md:order-1"}`} />

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
