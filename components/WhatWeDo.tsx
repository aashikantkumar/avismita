"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  VisualDataEngineering,
  VisualDataWarehousing,
  VisualAnalytics,
  VisualCloudPlatform,
} from "@/components/ui/animated-card";
import GeometricBackground from "@/components/ui/geometric";

type VisualComponent = ComponentType<{
  mainColor?: string;
  secondaryColor?: string;
  step?: number;
}>;

type ServiceSection = {
  title: string;
  VisualComponent: VisualComponent;
  mainColor: string;
  secondaryColor: string;
  steps: { title: string; desc: string }[];
};

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

const sectionsData: ServiceSection[] = [
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

const getScrollState = (progress: number) => {
  const totalSections = sectionsData.length;
  const clampedProgress = Math.min(1, Math.max(0, progress));
  const rawSection = clampedProgress * totalSections;
  const activeSectionIndex = Math.min(totalSections - 1, Math.floor(rawSection));
  const sectionProgress = activeSectionIndex === totalSections - 1 && clampedProgress === 1
    ? 1
    : rawSection - activeSectionIndex;
  const currentStep = Math.min(5, Math.max(1, Math.floor(sectionProgress * 5) + 1));

  return { activeSectionIndex, currentStep };
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function BrowserVisual({
  section,
  step,
  isActive = true,
}: {
  section: ServiceSection;
  step: number;
  isActive?: boolean;
}) {
  const Visual = section.VisualComponent;

  return (
    <div className="w-full max-w-2xl rounded-xl bg-[#0a0f1c] border border-slate-800 overflow-hidden shadow-2xl">
      <div className="flex items-center px-4 py-3 bg-[#0f172a] border-b border-slate-800 relative">
        <div className="flex gap-2 absolute left-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="mx-auto max-w-[calc(100%-96px)] truncate px-4 sm:px-6 py-1.5 rounded-full bg-[#0a0f1c] border border-slate-800 text-[10px] sm:text-xs text-slate-400 font-mono tracking-wide flex items-center gap-2 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full flex-none" style={{ backgroundColor: section.mainColor }} />
          <span className="truncate">studio.avismita.ai/platform/{section.title.toLowerCase().replace(" ", "-")}</span>
        </div>
      </div>
      <div className="p-0 bg-[#0a0f1c] h-[300px] sm:h-[380px] lg:h-[450px] flex items-center justify-center relative overflow-hidden">
        <div className="w-[350px] h-[180px] scale-[0.92] sm:scale-[1.45] md:scale-[1.6] lg:scale-[1.8] origin-center z-10 flex-shrink-0">
          <Visual mainColor={section.mainColor} secondaryColor={section.secondaryColor} step={isActive ? step : 1} />
        </div>
      </div>
    </div>
  );
}

function MasterScrollTelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const rafRef = useRef<number | null>(null);
  const stateRef = useRef({ activeSectionIndex: 0, currentStep: 1 });
  const [scrollState, setScrollState] = useState({ activeSectionIndex: 0, currentStep: 1 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const shouldUseStaticLayout = window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches;

    if (shouldUseStaticLayout) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${Math.min(4600, Math.max(3400, window.innerHeight * 4.2))}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (rafRef.current !== null) return;

          rafRef.current = window.requestAnimationFrame(() => {
            rafRef.current = null;
            const nextState = getScrollState(self.progress);
            const currentState = stateRef.current;

            if (
              nextState.activeSectionIndex !== currentState.activeSectionIndex ||
              nextState.currentStep !== currentState.currentStep
            ) {
              stateRef.current = nextState;
              setScrollState(nextState);
            }
          });
        }
      });
    }, containerRef);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, []);

  const { activeSectionIndex, currentStep } = scrollState;

  const scrollToSection = (idx: number) => {
    const trigger = scrollTriggerRef.current;
    if (!trigger) return;

    const sectionOffset = idx / sectionsData.length;
    const target = trigger.start + (trigger.end - trigger.start) * sectionOffset + 24;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div className="w-full relative z-30 bg-transparent hidden md:block">
      <div ref={containerRef} className="w-full min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.35fr] gap-8 lg:gap-16 items-center w-full max-w-7xl mx-auto px-6 relative min-h-[720px] lg:min-h-[620px]">
          <div className="w-full flex flex-col gap-8 relative h-[420px] lg:h-full justify-center order-2 lg:order-1">
            <div className="flex flex-wrap gap-2">
              {sectionsData.map((section, idx) => {
                const isActive = activeSectionIndex === idx;

                return (
                  <button
                    key={section.title}
                    type="button"
                    onClick={() => scrollToSection(idx)}
                    className={`h-10 rounded-full border px-4 text-xs font-semibold transition-all duration-300 ${isActive
                      ? "bg-slate-900 text-slate-50 border-slate-900 shadow-sm"
                      : "bg-[#0a0f1c]/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                    }`}
                    aria-pressed={isActive}
                  >
                    {section.title}
                  </button>
                );
              })}
            </div>

            <div className="relative h-[330px]">
              {sectionsData.map((section, idx) => {
                const isSectionActive = activeSectionIndex === idx;
                return (
                  <div
                    key={section.title}
                    className={`absolute inset-0 flex flex-col justify-center transition-all duration-700 ${isSectionActive
                      ? "opacity-100 translate-y-0 pointer-events-auto z-10"
                      : activeSectionIndex > idx
                        ? "opacity-0 -translate-y-16 pointer-events-none z-0"
                        : "opacity-0 translate-y-16 pointer-events-none z-0"
                    }`}
                  >
                    <div className="flex gap-6 md:gap-8 items-start">
                      <div className="text-5xl md:text-6xl font-bold font-mono pt-1" style={{ color: section.mainColor }}>
                        0{idx + 1}
                      </div>
                      <div className="flex flex-col gap-4 w-full mt-2">
                        <h3 className="text-3xl md:text-4xl font-bold font-sans text-slate-900">
                          {section.title}
                        </h3>

                        <div className="flex gap-2 mt-2" aria-hidden={!isSectionActive}>
                          {section.steps.map((step, stepIdx) => {
                            const isStepActive = isSectionActive && currentStep === stepIdx + 1;
                            const isStepComplete = isSectionActive && currentStep > stepIdx + 1;

                            return (
                              <span
                                key={step.title}
                                className="h-1.5 rounded-full transition-all duration-500"
                                style={{
                                  width: isStepActive ? 36 : 18,
                                  backgroundColor: isStepActive || isStepComplete ? section.mainColor : "var(--border)",
                                  opacity: isStepActive ? 1 : 0.45,
                                }}
                              />
                            );
                          })}
                        </div>

                        <div className="h-[210px] relative mt-5">
                          {section.steps.map((s, stepIdx) => {
                            const isStepActive = isSectionActive && currentStep === stepIdx + 1;
                            const isStepPast = (activeSectionIndex > idx) || (isSectionActive && currentStep > stepIdx + 1);
                            return (
                              <div
                                key={s.title}
                                className={`absolute top-0 left-0 w-full transition-all ease-out ${isStepActive
                                  ? "opacity-100 translate-y-0 pointer-events-auto scale-100 duration-500 delay-200"
                                  : isStepPast
                                    ? "opacity-0 -translate-y-8 pointer-events-none scale-95 duration-200 delay-0"
                                    : "opacity-0 translate-y-8 pointer-events-none scale-95 duration-200 delay-0"
                                }`}
                              >
                                <h4 className="text-xl font-semibold text-slate-900 mb-3 flex items-center gap-3">
                                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm"
                                    style={{ backgroundColor: `${section.mainColor}20`, color: section.mainColor, border: `1px solid ${section.mainColor}40` }}>
                                    {stepIdx + 1}
                                  </span>
                                  {s.title}
                                </h4>
                                <p className="text-slate-400 text-lg leading-relaxed">
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
          </div>

          <div className="w-full flex justify-center lg:justify-end relative h-[430px] lg:h-[530px] items-center order-1 lg:order-2">
            {sectionsData.map((section, idx) => {
              const isActive = activeSectionIndex === idx;
              return (
                <div
                  key={section.title}
                  className={`absolute transition-all duration-700 w-full flex justify-center lg:justify-end ${isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0 pointer-events-none"}`}
                >
                  <BrowserVisual section={section} step={currentStep} isActive={isActive} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileServiceCards({ forceVisible = false }: { forceVisible?: boolean }) {
  return (
    <div className={`w-full relative z-30 px-5 pb-20 ${forceVisible ? "block" : "block md:hidden"}`}>
      <div className="max-w-2xl mx-auto space-y-8">
        {sectionsData.map((section, idx) => (
          <article key={section.title} className="rounded-xl border border-slate-800 bg-[#0a0f1c] shadow-lg overflow-hidden">
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold font-mono flex-none" style={{ color: section.mainColor }}>
                  0{idx + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-zinc-100">{section.title}</h3>
                  <p className="text-sm text-zinc-400 mt-1">A focused view of how this service moves from challenge to outcome.</p>
                </div>
              </div>
            </div>
            <BrowserVisual section={section} step={5} />
            <ol className="p-5 space-y-3">
              {section.steps.map((step, stepIdx) => (
                <li key={step.title} className="grid grid-cols-[32px_1fr] gap-3">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: `${section.mainColor}20`, color: section.mainColor, border: `1px solid ${section.mainColor}40` }}
                  >
                    {stepIdx + 1}
                  </span>
                  <span>
                    <span className="block text-base font-semibold text-zinc-100">{step.title}</span>
                    <span className="block text-sm leading-relaxed text-zinc-400 mt-1">{step.desc}</span>
                  </span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </div>
  );
}

export function WhatWeDo() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <GeometricBackground dark={true}>
      <div id="what-we-do" className="pt-28 md:pt-32 pb-12 md:pb-16 px-6 md:px-12 max-w-[1550px] mx-auto text-center relative z-20 scroll-mt-8">
        <h2 className="text-4xl md:text-6xl font-bold font-sans text-slate-100">
          What We Do
        </h2>
        <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg md:text-xl">
          We engineer scalable data ecosystems from raw ingestion to actionable real-time intelligence. Scroll to explore our process.
        </p>
      </div>

      {prefersReducedMotion ? <MobileServiceCards forceVisible /> : <MasterScrollTelling />}
      {!prefersReducedMotion && <MobileServiceCards />}
    </GeometricBackground>
  );
}
