"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  VisualDataEngineering,
  VisualDataWarehousing,
  VisualAnalytics,
  VisualCloudPlatform,
} from "@/components/ui/animated-card";
import GeometricBackground from "@/components/ui/geometric";

const dataEngineeringSteps = [
  { title: "Fragmented Sources", desc: "We securely extract raw data from disconnected databases, APIs, and mobile applications." },
  { title: "ADF Ingestion", desc: "Pipelines orchestrate reliable data movement at scale using modern data factory tools." },
  { title: "Spark Processing", desc: "Massive datasets are processed and transformed efficiently in-memory via Databricks." },
  { title: "Delta Storage", desc: "Transformed data is stored in Delta Lake format, ensuring ACID compliance and reliability." },
  { title: "Insights Delivery", desc: "Cleaned datasets are delivered seamlessly to business teams for actionable reporting." }
];

const dataWarehousingSteps = [
  { title: "Isolated Silos", desc: "We begin by identifying and breaking down isolated data silos across the enterprise." },
  { title: "Star Schema Modeling", desc: "Data is structured into optimized star schemas for intuitive and efficient querying." },
  { title: "Index Optimization", desc: "Advanced indexing and partitioning are applied to dramatically speed up query performance." },
  { title: "Global Replication", desc: "Data is replicated globally across cloud regions to ensure low-latency access worldwide." },
  { title: "High Availability", desc: "The warehouse becomes a highly available, single source of truth for the organization." }
];

const analyticsSteps = [
  { title: "Noisy Metrics", desc: "Raw, noisy data points are continuously collected from your operational systems." },
  { title: "Smart Filtering", desc: "We implement smart filtering algorithms to remove anomalies and ensure data quality." },
  { title: "Live Aggregation", desc: "Data is continuously and dynamically aggregated in real-time." },
  { title: "Interactive Analysis", desc: "Business analysts use interactive tools to effortlessly slice and dice the core metrics." },
  { title: "Actionable Insights", desc: "The final dashboard reveals crystal-clear insights that drive confident decision making." }
];

const cloudPlatformSteps = [
  { title: "Legacy Monolith", desc: "We assess and begin decomposing your legacy monolithic application architecture." },
  { title: "Containerization", desc: "Services are containerized and orchestrated using modern, scalable Kubernetes." },
  { title: "Autoscaling", desc: "The infrastructure automatically scales up and down precisely based on real-time traffic." },
  { title: "Multi-Cloud Mesh", desc: "A secure networking mesh connects deployments across robust multi-cloud environments." },
  { title: "Fault Tolerant", desc: "The final architecture is fully fault-tolerant, highly secure, and optimized for reliability." }
];

const sectionsData = [
  {
    title: "Data Engineering",
    VisualComponent: VisualDataEngineering,
    mainColor: "#3b82f6",
    secondaryColor: "#60a5fa",
    steps: dataEngineeringSteps
  },
  {
    title: "Data Warehousing",
    VisualComponent: VisualDataWarehousing,
    mainColor: "#6366f1",
    secondaryColor: "#818cf8",
    steps: dataWarehousingSteps
  },
  {
    title: "Analytics",
    VisualComponent: VisualAnalytics,
    mainColor: "#10b981",
    secondaryColor: "#34d399",
    steps: analyticsSteps
  },
  {
    title: "Cloud Platform",
    VisualComponent: VisualCloudPlatform,
    mainColor: "#06b6d4",
    secondaryColor: "#22d3ee",
    steps: cloudPlatformSteps
  }
];

function MasterScrollTelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [globalProgress, setGlobalProgress] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top", // Pin exactly when it hits the top of the viewport
          end: "+=8000",
          pin: true,
          pinSpacing: true, // Explicitly force the spacer
          scrub: true,
          onUpdate: (self) => {
            setGlobalProgress(self.progress);
          }
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  const totalSections = sectionsData.length;
  // Calculate which section is active (0 to 3)
  const activeSectionIndex = Math.min(totalSections - 1, Math.floor(globalProgress * totalSections));

  // Calculate progress within the current section (0.0 to 1.0)
  const sectionProgress = (globalProgress * totalSections) - activeSectionIndex;

  // Convert section progress to step (1 to 5)
  const currentStep = Math.min(5, Math.max(1, Math.ceil(sectionProgress * 5)));

  return (
    <div className="w-full block relative z-30 bg-transparent">
      <div ref={containerRef} className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-transparent">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-center w-full max-w-7xl mx-auto px-6 relative h-[750px] lg:h-[600px]">

          {/* Left Side: Text details */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6 relative h-[300px] lg:h-full justify-center order-2 lg:order-1">
            {sectionsData.map((section, idx) => {
              const isSectionActive = activeSectionIndex === idx;
              return (
                <div
                  key={idx}
                  className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ${isSectionActive
                    ? 'opacity-100 translate-y-0 pointer-events-auto z-10'
                    : activeSectionIndex > idx
                      ? 'opacity-0 -translate-y-16 pointer-events-none z-0'
                      : 'opacity-0 translate-y-16 pointer-events-none z-0'
                    }`}
                >
                  <div className="flex gap-6 md:gap-8 items-start">
                    <div className="text-5xl md:text-6xl font-bold font-mono pt-1" style={{ color: section.mainColor }}>
                      0{idx + 1}
                    </div>
                    <div className="flex flex-col gap-4 w-full mt-2">
                      <h3 className="text-3xl md:text-4xl font-bold font-sans tracking-wide text-slate-900">
                        {section.title}
                      </h3>

                      <div className="h-[200px] relative mt-4">
                        {section.steps.map((s, stepIdx) => {
                          const isStepActive = isSectionActive && currentStep === stepIdx + 1;
                          const isStepPast = (activeSectionIndex > idx) || (isSectionActive && currentStep > stepIdx + 1);
                          return (
                            <div
                              key={stepIdx}
                              className={`absolute top-0 left-0 w-full transition-all ease-out ${isStepActive
                                ? 'opacity-100 translate-y-0 pointer-events-auto scale-100 duration-500 delay-200'
                                : isStepPast
                                  ? 'opacity-0 -translate-y-8 pointer-events-none scale-95 duration-200 delay-0'
                                  : 'opacity-0 translate-y-8 pointer-events-none scale-95 duration-200 delay-0'
                                }`}
                            >
                              <h4 className="text-xl font-semibold text-slate-900 mb-3 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm"
                                  style={{ backgroundColor: `${section.mainColor}20`, color: section.mainColor, border: `1px solid ${section.mainColor}40` }}>
                                  {stepIdx + 1}
                                </span>
                                {s.title}
                              </h4>
                              <p className="text-slate-600 text-lg leading-relaxed">
                                {s.desc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Visualizer (Browser Box) */}
          <div className="w-full lg:w-7/12 flex justify-center lg:justify-end relative h-[400px] lg:h-[500px] items-center order-1 lg:order-2">
            {sectionsData.map((section, idx) => {
              const Visual = section.VisualComponent;
              const isActive = activeSectionIndex === idx;
              return (
                <div
                  key={idx}
                  className={`absolute transition-all duration-700 w-full flex justify-center lg:justify-end ${isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 z-0 pointer-events-none'}`}
                >
                  {/* Browser Window Box */}
                  <div className="w-full max-w-2xl rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xl">
                    {/* Top Bar */}
                    <div className="flex items-center px-4 py-3 bg-slate-50 border-b border-slate-200 relative">
                      <div className="flex gap-2 absolute left-4">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                      </div>
                      <div className="mx-auto px-6 py-1.5 rounded-full bg-white border border-slate-200 text-[10px] sm:text-xs text-slate-500 font-mono tracking-wide flex items-center gap-2 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: section.mainColor }}></span>
                        studio.avismita.ai/platform/{section.title.toLowerCase().replace(" ", "-")}
                      </div>
                    </div>
                    {/* Content Container */}
                    <div className="p-0 bg-slate-50 h-[350px] sm:h-[450px] flex items-center justify-center relative overflow-hidden">
                      <div className="w-[350px] h-[180px] scale-[1.0] sm:scale-[1.6] md:scale-[1.8] origin-center z-10 flex-shrink-0">
                        <Visual mainColor={section.mainColor} secondaryColor={section.secondaryColor} step={isActive ? currentStep : 1} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}

export function WhatWeDo() {
  return (
    <GeometricBackground>
      {/* What We Do Section Intro */}
      <div id="what-we-do" className="pt-32 pb-16 px-6 md:px-12 max-w-[1550px] mx-auto text-center relative z-20">
        <h2 className="text-4xl md:text-6xl font-bold font-sans tracking-wide text-slate-900">
          What We Do
        </h2>
        <p className="text-slate-600 mt-6 max-w-2xl mx-auto text-lg md:text-xl">
          We engineer scalable data ecosystems from raw ingestion to actionable real-time intelligence. Scroll to explore our process.
        </p>
      </div>

      {/* Scroll-Telling Section (Master Pin) */}
      <MasterScrollTelling />
    </GeometricBackground>
  );
}
