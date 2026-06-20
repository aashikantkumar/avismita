"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { CTABlock } from "@/components/CTABlock";
import { CheckCircle2, UserCheck, Briefcase, Workflow, ArrowRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const CinematicFooter = dynamic(() => import('@/components/ui/motion-footer').then(mod => mod.CinematicFooter));
const ContactSection = dynamic(() => import('@/components/organisms/contact-section').then(mod => mod.ContactSection));

const models = [
  {
    title: "Dedicated Resource",
    icon: UserCheck,
    color: "#3b82f6", // blue
    benefits: [
      "Full-time support",
      "Monthly billing",
      "Flexible scaling",
    ]
  },
  {
    title: "Project Based",
    icon: Briefcase,
    color: "#10b981", // emerald
    benefits: [
      "Fixed scope",
      "Predictable cost",
      "Clear timeline",
    ]
  },
  {
    title: "Managed Delivery",
    icon: Workflow,
    color: "#8b5cf6", // purple
    benefits: [
      "End-to-end ownership",
      "Strategic guidance",
      "Long-term support",
    ]
  }
];

export default function EngagementModelsPage() {
  return (
    <div className="relative min-h-screen bg-[#000000] text-slate-50 selection:bg-indigo-500/30 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#000000] to-[#000000] pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-[12px] font-mono text-blue-400 font-bold uppercase tracking-[0.2em] mb-6">
              Partnership Options
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans mb-8 leading-tight">
              Engagement <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
                Models
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Flexible partnership structures designed to align perfectly with your business goals, team size, and project scope.
            </p>
          </div>
        </section>

        {/* Models Grid */}
        <section className="relative py-24 px-6 md:px-12 bg-[#000000]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {models.map((model, idx) => {
                const Icon = model.icon;
                return (
                  <div key={model.title} className="relative bg-slate-950/40 border border-white/10 rounded-3xl p-8 hover:bg-slate-900/60 transition-all backdrop-blur-md overflow-hidden flex flex-col group shadow-2xl">
                    <div 
                      className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ backgroundColor: model.color }}
                    />
                    
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/5 shadow-inner"
                      style={{ backgroundColor: `${model.color}15`, color: model.color }}
                    >
                      <Icon size={28} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">{model.title}</h3>
                    
                    <ul className="space-y-4 mb-8 flex-grow">
                      {model.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-300">
                          <CheckCircle2 size={18} style={{ color: model.color }} />
                          <span className="font-medium text-sm md:text-base">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <Link 
                      href="/#contact"
                      className="mt-auto inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold uppercase tracking-widest text-[11px] transition-all border border-white/10 hover:border-white/20 group/btn"
                    >
                      <span>Choose Model</span>
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Comparison Table */}
            <div className="bg-slate-950/40 border border-white/10 rounded-3xl p-8 lg:p-12 backdrop-blur-md shadow-2xl overflow-x-auto">
              <h3 className="text-2xl font-bold text-white mb-8 tracking-tight text-center">Model Comparison</h3>
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-4 px-4 text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Feature</th>
                    <th className="py-4 px-4 text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">Dedicated Resource</th>
                    <th className="py-4 px-4 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">Project Based</th>
                    <th className="py-4 px-4 text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">Managed Delivery</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-semibold text-white">Pricing Structure</td>
                    <td className="py-4 px-4">Monthly Retainer</td>
                    <td className="py-4 px-4">Fixed Milestone</td>
                    <td className="py-4 px-4">Tiered / Custom</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-semibold text-white">Ideal For</td>
                    <td className="py-4 px-4">Continuous development & scaling</td>
                    <td className="py-4 px-4">Well-defined scope & deliverables</td>
                    <td className="py-4 px-4">Enterprise platform ownership</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-semibold text-white">Project Management</td>
                    <td className="py-4 px-4">Client managed</td>
                    <td className="py-4 px-4">Avismita managed</td>
                    <td className="py-4 px-4">Joint steering committee</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-semibold text-white">Resource Allocation</td>
                    <td className="py-4 px-4">100% Dedicated</td>
                    <td className="py-4 px-4">Shared expert pool</td>
                    <td className="py-4 px-4">Dedicated hybrid team</td>
                  </tr>
                </tbody>
              </table>
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
