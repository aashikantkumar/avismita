"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, Cloud, Server, Layers, BarChart3, Zap, Activity, FileCode2 } from "lucide-react";

// For Snowflake, lucide doesn't have a direct snowflake icon that looks like the brand, but we'll use an asterisk or something similar.
import { Asterisk } from "lucide-react"; 

const technologies = [
  { name: "Databricks", icon: Database, color: "#ff3621" },
  { name: "Snowflake", icon: Asterisk, color: "#29b5e8" },
  { name: "Microsoft Fabric", icon: Layers, color: "#0078d4" },
  { name: "Azure", icon: Cloud, color: "#0089d6" },
  { name: "AWS", icon: Server, color: "#ff9900" },
  { name: "Power BI", icon: BarChart3, color: "#f2c811" },
  { name: "Spark", icon: Zap, color: "#e25a1c" },
  { name: "Kafka", icon: Activity, color: "#231f20" }, // In dark mode, a white/grey icon is better for Kafka
  { name: "Python", icon: FileCode2, color: "#3776ab" },
];

export function TechStack() {
  return (
    <section className="relative w-full bg-[#000000] text-slate-50 py-20 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest mb-4">
            Ecosystem
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white font-sans mb-12">
            Technology Stack
          </h3>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {technologies.map((tech, idx) => {
            const Icon = tech.icon;
            const displayColor = tech.name === "Kafka" ? "#e5e7eb" : tech.color; // adjust contrast for dark mode
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex items-center gap-3 px-6 py-4 bg-slate-950/40 border border-white/10 rounded-xl hover:bg-slate-900/80 transition-colors backdrop-blur-sm group"
              >
                <Icon size={24} style={{ color: displayColor }} className="group-hover:scale-110 transition-transform" />
                <span className="font-bold text-sm text-slate-300 group-hover:text-white transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
