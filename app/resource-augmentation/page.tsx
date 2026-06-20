"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { CTABlock } from "@/components/CTABlock";
import { Database, LineChart, LayoutDashboard, Cloud, Users, Workflow, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const CinematicFooter = dynamic(() => import('@/components/ui/motion-footer').then(mod => mod.CinematicFooter));
const ContactSection = dynamic(() => import('@/components/organisms/contact-section').then(mod => mod.ContactSection));

const roles = [
  {
    title: "Dedicated Data Engineers",
    icon: Database,
    color: "#3b82f6", // blue
    desc: "Experts in Databricks, Snowflake, and complex ETL pipelines."
  },
  {
    title: "Data Analysts",
    icon: LineChart,
    color: "#10b981", // emerald
    desc: "Specialists in querying, data wrangling, and actionable insights."
  },
  {
    title: "BI Developers",
    icon: LayoutDashboard,
    color: "#f59e0b", // amber
    desc: "Masters of Power BI, Tableau, and enterprise dashboarding."
  },
  {
    title: "Cloud Engineers",
    icon: Cloud,
    color: "#8b5cf6", // purple
    desc: "Architects for secure, scalable Azure and AWS infrastructure."
  }
];

const processes = [
  {
    title: "Hiring Process",
    icon: Users,
    desc: "We match pre-vetted, highly skilled professionals to your specific technical requirements within 48 hours."
  },
  {
    title: "Onboarding Timeline",
    icon: Clock,
    desc: "Seamless integration into your workflows. Most resources are fully productive within the first 1-2 weeks."
  },
  {
    title: "Team Structure",
    icon: Workflow,
    desc: "Resources can embed directly into your Agile pods or operate as a parallel execution team managed by us."
  },
  {
    title: "Support Model",
    icon: ShieldCheck,
    desc: "Continuous technical upskilling and backup support from our senior architectural brain trust."
  }
];

export default function ResourceAugmentationPage() {
  return (
    <div className="relative min-h-screen bg-[#000000] text-slate-50 selection:bg-indigo-500/30 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#000000] to-[#000000] pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-[12px] font-mono text-purple-400 font-bold uppercase tracking-[0.2em] mb-6">
              Scale Your Capabilities
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans mb-8 leading-tight">
              Resource <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
                Augmentation
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              Accelerate your data initiatives by seamlessly integrating our top-tier data engineers, analysts, and cloud architects into your team.
            </p>
            <Link 
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)] group/btn"
            >
              <span>Schedule Free Consultation</span>
              <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform stroke-[2.5]" />
            </Link>
          </div>
        </section>

        {/* Roles Section */}
        <section className="relative py-24 px-6 md:px-12 bg-[#000000]">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white font-sans mb-12 text-center">
              Specialized Talent Profiles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <div key={role.title} className="bg-slate-950/40 border border-white/10 rounded-2xl p-8 hover:bg-slate-900/60 transition-colors backdrop-blur-md group relative overflow-hidden">
                    <div 
                      className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ backgroundColor: role.color }}
                    />
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/5"
                      style={{ backgroundColor: `${role.color}15`, color: role.color }}
                    >
                      <Icon size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{role.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {role.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Methodology / Processes */}
        <section className="relative py-24 px-6 md:px-12 bg-slate-950/20 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white font-sans mb-16 text-center">
              How We Augment Your Team
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {processes.map((process, idx) => {
                const Icon = process.icon;
                return (
                  <div key={process.title} className="flex gap-6">
                    <div className="shrink-0 w-16 h-16 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-lg text-purple-400">
                      <Icon size={28} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-3 tracking-tight">{process.title}</h4>
                      <p className="text-base text-slate-400 leading-relaxed">
                        {process.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Global CTA */}
        <CTABlock ctaText="Schedule Free Consultation" />

        <div className="border-t border-white/5">
          <ContactSection />
        </div>
      </main>

      <CinematicFooter />
    </div>
  );
}
