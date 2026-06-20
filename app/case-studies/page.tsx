import React from "react";
import { Navbar } from "@/components/Navbar";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { CTABlock } from "@/components/CTABlock";
import dynamic from "next/dynamic";

const CinematicFooter = dynamic(() => import('@/components/ui/motion-footer').then(mod => mod.CinematicFooter));
const ContactSection = dynamic(() => import('@/components/organisms/contact-section').then(mod => mod.ContactSection));

const caseStudies = [
  {
    title: "Manufacturing Analytics Platform",
    challenge: "The client struggled with a legacy reporting system that was slow, disconnected, and unable to handle the growing volume of IoT sensor data from their manufacturing lines. This resulted in delayed operational visibility and reactive, rather than proactive, maintenance.",
    solution: "We designed and implemented a robust Azure Databricks architecture. By building automated Spark pipelines, we ingested and structured streaming IoT data into a Delta Lake, creating a unified, high-performance analytics backend directly connected to Power BI.",
    results: [
      "Processing millions of records/day reliably",
      "80% faster reporting and dashboard load times",
      "Better operational visibility enabling predictive maintenance",
    ],
    technologies: ["Azure", "Databricks", "Spark", "Power BI", "Delta Lake"],
  },
  {
    title: "Data Warehouse Modernization",
    challenge: "The organization was bottlenecked by a legacy ETL architecture and an on-premise data warehouse. Queries took hours to run, scalability was limited, and the system required constant, expensive engineering maintenance to prevent failures.",
    solution: "We executed a complete data warehouse modernization by migrating their ecosystem to Snowflake and implementing a Medallion Architecture using Databricks. We standardized their data models and optimized partitioning strategies for analytical workloads.",
    results: [
      "60% faster queries for the BI and Data Science teams",
      "Infinite scalability with decoupled compute and storage",
      "Significantly lower maintenance and infrastructure costs",
    ],
    technologies: ["Databricks", "Delta Lake", "Snowflake", "Spark", "AWS"],
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="relative min-h-screen bg-[#000000] text-slate-50 selection:bg-indigo-500/30 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 border-b border-white/5 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#000000] to-[#000000] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-[12px] font-mono text-indigo-400 font-bold uppercase tracking-[0.2em] mb-6">
              Proven Results
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans mb-8 leading-tight">
              Enterprise <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">
                Case Studies
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Explore how we have engineered scalable data platforms and solved complex analytics challenges for our enterprise clients.
            </p>
          </div>
        </section>

        {/* Case Studies List */}
        <section className="relative py-24 px-6 md:px-12 bg-[#000000]">
          <div className="max-w-6xl mx-auto space-y-16">
            {caseStudies.map((study, index) => (
              <CaseStudyCard
                key={study.title}
                title={study.title}
                challenge={study.challenge}
                solution={study.solution}
                results={study.results}
                technologies={study.technologies}
                delay={index * 0.15}
              />
            ))}
          </div>
        </section>

        {/* Global CTA */}
        <CTABlock ctaText="Discuss Your Data Project" />

        {/* Contact Section at the bottom */}
        <div className="border-t border-white/5">
          <ContactSection />
        </div>
      </main>

      <CinematicFooter />
    </div>
  );
}
