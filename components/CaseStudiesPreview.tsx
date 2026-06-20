"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Database, Server } from "lucide-react";
import Link from "next/link";

const previewStudies = [
  {
    title: "Manufacturing Analytics Platform",
    category: "Databricks & Power BI",
    description: "Modernized a legacy reporting system with an Azure Databricks architecture, resulting in 80% faster reporting and better operational visibility.",
    icon: Database,
    color: "#3b82f6", // blue
  },
  {
    title: "Data Warehouse Modernization",
    category: "Snowflake & Medallion Architecture",
    description: "Replaced a legacy ETL architecture with Snowflake and Databricks, delivering 60% faster queries and infinite scalability.",
    icon: Server,
    color: "#10b981", // emerald
  }
];

export function CaseStudiesPreview() {
  return (
    <section className="relative w-full bg-[#000000] text-slate-50 py-24 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h2 className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest mb-4">
              Our Work
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-sans">
              Case Studies
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full font-bold uppercase tracking-widest text-xs transition-all border border-white/10 hover:border-white/20 group/btn"
            >
              <span>View All Studies</span>
              <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform stroke-[2.5]" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {previewStudies.map((study, idx) => {
            const Icon = study.icon;
            return (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group relative bg-slate-950/40 border border-white/10 rounded-3xl p-8 hover:bg-slate-900/60 hover:border-white/20 transition-all backdrop-blur-sm overflow-hidden flex flex-col"
              >
                <div 
                  className="absolute top-0 right-0 w-48 h-48 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ backgroundColor: study.color }}
                />

                <div className="flex items-center justify-between mb-8">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/5"
                    style={{ backgroundColor: `${study.color}15`, color: study.color }}
                  >
                    <Icon size={24} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 bg-white/5">
                    {study.category}
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">{study.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-grow">
                  {study.description}
                </p>

                <Link 
                  href="/case-studies"
                  className="inline-flex items-center text-[11px] font-bold uppercase tracking-widest text-white group/link mt-auto w-max"
                  style={{ color: study.color }}
                >
                  <span className="border-b border-transparent group-hover/link:border-current transition-colors pb-0.5">
                    Read Case Study
                  </span>
                  <ArrowRight size={14} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
