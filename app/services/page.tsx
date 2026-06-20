"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { ServiceCard } from "@/components/ServiceCard";
import { CTABlock } from "@/components/CTABlock";
import { Database, BarChart3, Cloud, Users } from "lucide-react";
import dynamic from "next/dynamic";

const CinematicFooter = dynamic(() => import('@/components/ui/motion-footer').then(mod => mod.CinematicFooter));
const ContactSection = dynamic(() => import('@/components/organisms/contact-section').then(mod => mod.ContactSection));

const services = [
  {
    title: "Data Engineering",
    description: "Build scalable, reliable, and high-performance data infrastructure.",
    icon: Database,
    color: "#3b82f6", // blue
    subServices: [
      "ETL/ELT",
      "Databricks",
      "Spark",
      "Delta Lake",
      "Data Pipelines",
      "Real-Time Processing",
    ]
  },
  {
    title: "Data Analytics",
    description: "Transform raw data into actionable business intelligence.",
    icon: BarChart3,
    color: "#10b981", // emerald
    subServices: [
      "Power BI",
      "Fabric Analytics",
      "KPI Dashboards",
      "Business Intelligence",
    ]
  },
  {
    title: "Cloud Engineering",
    description: "Design and migrate architectures on enterprise cloud platforms.",
    icon: Cloud,
    color: "#8b5cf6", // purple
    subServices: [
      "Azure",
      "AWS",
      "Cloud Migration",
      "Architecture Design",
    ]
  },
  {
    title: "Resource Augmentation",
    description: "Scale your capabilities with our specialized data talent.",
    icon: Users,
    color: "#f43f5e", // rose
    subServices: [
      "Dedicated Data Engineers",
      "Contract Resources",
      "Project Teams",
    ]
  }
];

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen bg-[#000000] text-slate-50 selection:bg-indigo-500/30 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 border-b border-white/5 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#000000] to-[#000000] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-[12px] font-mono text-blue-400 font-bold uppercase tracking-[0.2em] mb-6">
              Platform Architecture
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans mb-8 leading-tight">
              Enterprise <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
                Data Services
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              We engineer complete data ecosystems—from robust pipelines and real-time processing to predictive analytics and beautiful BI dashboards.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="relative py-24 px-6 md:px-12 bg-[#000000]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  color={service.color}
                  subServices={service.subServices}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Global CTA */}
        <CTABlock ctaText="Talk To A Data Architect" />

        {/* Contact Section at the bottom */}
        <div className="border-t border-white/5">
          <ContactSection />
        </div>
      </main>

      <CinematicFooter />
    </div>
  );
}
