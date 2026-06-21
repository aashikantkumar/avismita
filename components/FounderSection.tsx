"use client";

import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { CTABlock } from "@/components/CTABlock";
import Image from "next/image";

const leaders = [
  {
    name: "Abhijeet Kumar Acharya",
    role: "Founder & CEO",
    description: "Senior Lead Engineer with 4.5+ years of experience architecting high-performance ETL pipelines and Lakehouse architectures for large-scale workloads. Proven track record of leading engineering teams and delivering scalable, cost-optimized data solutions across AWS, Snowflake, Databricks, Azure, and Microsoft Fabric that improve processing efficiency by up to 70%.",
    tags: [
      "Databricks",
      "Snowflake",
      "Microsoft Fabric",
      "Azure",
      "AWS",
      "Data Engineering",
      "Big Data Analytics",
      "Solution Architecture"
    ],
    image: "/WhatsApp%20Image%202026-06-20%20at%201.55.59%20PM.jpeg"
  },
  {
    name: "Gulshan Kumar",
    role: "CTO",
    description: "Specializing in the design of cloud-native data platforms, distributed ETL architectures, and scalable analytics solutions. Architecting metadata-driven ingestion frameworks, dimensional data models, and high-performance data warehouses using Azure, Databricks, Python, and SQL.",
    tags: [
      "Cloud-Native",
      "ETL Architectures",
      "Azure",
      "Databricks",
      "Python",
      "SQL",
      "Data Modeling"
    ],
    image: "/WhatsApp%20Image%202026-06-20%20at%202.35.32%20PM.jpeg"
  }
];

export function FounderSection() {
  return (
    <section className="relative w-full bg-[#000000] text-slate-50 py-24 border-t border-white/5 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#000000] to-[#000000] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 mb-24">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-widest mb-4">
            Leadership
          </h2>
          <h3 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-sans mb-6">
            Meet the Team
          </h3>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Our leadership brings together deep expertise in modern data platforms. We don&apos;t just build pipelines; we engineer end-to-end ecosystems that empower startups and enterprises to truly leverage their data.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="w-full flex justify-center"
            >
              <div className="w-full bg-slate-950/60 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-sm relative overflow-hidden group">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: "radial-gradient(600px circle at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 70%)" }}
                />

                <div className="flex flex-col items-center text-center relative z-10 h-full">
                  {/* Photo */}
                  <div className="w-32 h-32 rounded-full border-2 border-indigo-500/30 p-1 mb-6 relative overflow-hidden bg-slate-900 shadow-[0_0_20px_rgba(99,102,241,0.15)] flex items-center justify-center">
                    {leader.image ? (
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <>
                        <User className="w-12 h-12 text-slate-600" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent" />
                      </>
                    )}
                  </div>

                  <h4 className="text-2xl font-bold text-white tracking-tight mb-1">{leader.name}</h4>
                  <p className="text-indigo-400 font-mono text-xs font-bold uppercase tracking-wider mb-6">
                    {leader.role}
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed mb-8 px-4 flex-grow">
                    {leader.description}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap justify-center gap-2 mt-auto">
                    {leader.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-mono text-indigo-300 font-bold uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
      <CTABlock
        title="Ready to augment your capabilities?"
        description="Leverage our leadership-led execution model to accelerate your data transformation journey."
        ctaText="Talk To A Data Architect"
      />
    </section>
  );
}
