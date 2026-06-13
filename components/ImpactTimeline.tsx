"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cpu, Hexagon, Database, Target, Lightbulb, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

const timelineData = [
  {
    title: "Context",
    description: "Legacy systems were fragmented, causing severe operational bottlenecks.",
    icon: Database,
  },
  {
    title: "Challenge",
    description: "Disorganized data flows and high latency led to inaccurate decision-making.",
    icon: Target,
  },
  {
    title: "Approach",
    description: "Re-architecting the infrastructure with AI-driven processing and streamlined pipelines.",
    icon: Lightbulb,
  },
  {
    title: "Outcome",
    description: "A highly performant, scalable system with real-time analytics and clean data packets.",
    icon: CheckCircle2,
  },
];

const CHAOS_NODES = [
  { cx: 150, cy: 150, r: 8, color: "#ef4444" },
  { cx: 100, cy: 350, r: 12, color: "#f97316" },
  { cx: 300, cy: 100, r: 6, color: "#ef4444" },
  { cx: 250, cy: 500, r: 10, color: "#f97316" },
  { cx: 350, cy: 300, r: 14, color: "#ef4444" },
  { cx: 200, cy: 250, r: 9, color: "#f97316" },
  { cx: 400, cy: 450, r: 7, color: "#ef4444" },
];

const CHALLENGE_LINES = [
  "M 150 150 L 250 100 L 350 180 L 500 300",
  "M 100 350 L 200 400 L 350 250 L 500 300",
  "M 300 100 L 350 150 L 400 200 L 500 300",
  "M 250 500 L 350 450 L 400 400 L 500 300",
  "M 350 300 L 400 280 L 450 320 L 500 300",
  "M 200 250 L 280 200 L 380 280 L 500 300",
  "M 400 450 L 420 400 L 480 350 L 500 300",
];

const OUTCOME_LINES = [
  { id: "outcome-path-1", d: "M 500 300 C 600 150, 700 150, 850 150" },
  { id: "outcome-path-2", d: "M 500 300 C 650 300, 750 300, 850 300" },
  { id: "outcome-path-3", d: "M 500 300 C 600 450, 700 450, 850 450" },
];

export function ImpactTimeline() {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const nodes = gsap.utils.toArray(".chaos-node");
    const lines = gsap.utils.toArray(".challenge-line");
    const outcomeLines = gsap.utils.toArray(".outcome-line");
    const packets = gsap.utils.toArray(".data-packet");
    const chipGlow = ".center-chip-glow";
    const chipCard = ".center-chip-card";
    const hexagons = gsap.utils.toArray(".outcome-hexagon");

    // Clean up current animations
    gsap.killTweensOf([...nodes, ...lines, ...outcomeLines, ...packets, chipGlow, chipCard, ...hexagons]);

    if (activeCard === 0) {
      // ----------------------------------------------------
      // STATE 0: CONTEXT (The Drift)
      // ----------------------------------------------------
      gsap.to(nodes, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        overwrite: "auto",
        onComplete: () => {
          nodes.forEach((node: any) => {
            gsap.killTweensOf(node);
            gsap.to(node, {
              x: "random(-30, 30)",
              y: "random(-30, 30)",
              duration: "random(3, 5)",
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          });
        }
      });

      gsap.to(lines, { opacity: 0, duration: 0.5 });
      gsap.to(chipCard, { opacity: 0.3, scale: 0.9, duration: 0.5 });
      gsap.to(chipGlow, { opacity: 0, duration: 0.5 });
      gsap.to(outcomeLines, { opacity: 0, duration: 0.5 });
      gsap.to(packets, { opacity: 0, scale: 0, duration: 0.3 });
      gsap.to(hexagons, { opacity: 0.2, scale: 0.95, duration: 0.5 });
    }
    
    else if (activeCard === 1) {
      // ----------------------------------------------------
      // STATE 1: CHALLENGE (The Jitter)
      // ----------------------------------------------------
      gsap.to(nodes, {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        overwrite: "auto",
        onComplete: () => {
          nodes.forEach((node: any) => {
            if (!gsap.isTweening(node)) {
              gsap.to(node, {
                x: "random(-30, 30)",
                y: "random(-30, 30)",
                duration: "random(3, 5)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
              });
            }
          });
        }
      });

      // Show flickering red lines
      gsap.set(lines, { strokeDasharray: "15 25", strokeDashoffset: 0 });
      gsap.to(lines, {
        opacity: 0.8,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.05,
          from: "random"
        },
        ease: "steps(1)"
      });
      gsap.to(lines, {
        strokeDashoffset: -100,
        duration: 3,
        repeat: -1,
        ease: "none"
      });

      gsap.to(chipCard, { opacity: 0.3, scale: 0.9, duration: 0.5 });
      gsap.to(chipGlow, { opacity: 0, duration: 0.5 });
      gsap.to(outcomeLines, { opacity: 0, duration: 0.5 });
      gsap.to(packets, { opacity: 0, scale: 0, duration: 0.3 });
      gsap.to(hexagons, { opacity: 0.2, scale: 0.95, duration: 0.5 });
    }
    
    else if (activeCard === 2) {
      // ----------------------------------------------------
      // STATE 2: APPROACH (The AI Vacuum)
      // ----------------------------------------------------
      gsap.to(lines, { opacity: 0, duration: 0.3 });

      // Ingest scattered nodes into the central processor
      nodes.forEach((node: any, idx: number) => {
        gsap.killTweensOf(node);
        const cx = parseFloat(node.getAttribute("cx") || "0");
        const cy = parseFloat(node.getAttribute("cy") || "0");
        
        gsap.to(node, {
          x: 500 - cx,
          y: 300 - cy,
          scale: 0,
          opacity: 0,
          duration: 1.2,
          ease: "power3.in",
          delay: idx * 0.04
        });
      });

      // Animate processor powering up
      gsap.to(chipCard, { opacity: 1, scale: 1.1, duration: 0.6, ease: "back.out(1.5)" });
      gsap.to(chipGlow, { opacity: 0.8, duration: 0.8 });

      // Draw output lines
      gsap.set(outcomeLines, { opacity: 1 });
      outcomeLines.forEach((line: any) => {
        const length = line.getTotalLength ? line.getTotalLength() : 1000;
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out", delay: 0.4 });
      });

      gsap.to(packets, { opacity: 0, scale: 0, duration: 0.3 });
      gsap.to(hexagons, { opacity: 0.6, scale: 1.0, duration: 0.8, delay: 0.6 });
    }
    
    else if (activeCard === 3) {
      // ----------------------------------------------------
      // STATE 3: OUTCOME (The High-Speed Flow)
      // ----------------------------------------------------
      gsap.set(nodes, { opacity: 0, scale: 0 });
      gsap.set(lines, { opacity: 0 });

      gsap.to(chipCard, { opacity: 1, scale: 1.0, duration: 0.5 });
      gsap.to(chipGlow, { opacity: 1, duration: 0.5 });

      // Ensure outcome curves are fully drawn and visible
      gsap.set(outcomeLines, { opacity: 1 });
      outcomeLines.forEach((line: any) => {
        const length = line.getTotalLength ? line.getTotalLength() : 1000;
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: 0 });
      });

      // Animate structured hexagons fully active
      gsap.to(hexagons, { opacity: 1, scale: 1.05, duration: 0.5 });

      // Continuous high-speed streaming of data packets along the blue curves
      gsap.set(packets, { opacity: 0, scale: 0 });
      packets.forEach((packet: any, index: number) => {
        const pathId = `#outcome-path-${index + 1}`;
        
        gsap.to(packet, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          delay: index * 0.15
        });

        gsap.to(packet, {
          motionPath: {
            path: pathId,
            align: pathId,
            alignOrigin: [0.5, 0.5]
          },
          duration: 1.5,
          repeat: -1,
          ease: "none",
          delay: index * 0.15
        });
      });
    }

  }, { dependencies: [activeCard], scope: containerRef });

  return (
    <section id="impact" className="w-full bg-transparent py-24 px-6 md:px-12 relative overflow-hidden z-20">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-sans tracking-wide text-slate-900 mb-4">
            System Evolution
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Interactive visualization of our architectural impact from chaos to structured intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 min-h-[600px]">
          
          {/* Left Column (Timeline) */}
          <div className="relative flex flex-col justify-center">
            {/* Vertical Line */}
            <div className="absolute left-[23px] top-[10%] bottom-[10%] w-[2px] bg-rose-500/20 rounded-full z-0 hidden sm:block"></div>
            
            <div className="space-y-6 relative z-10">
              {timelineData.map((item, idx) => {
                const isActive = activeCard === idx;
                const Icon = item.icon;
                return (
                  <div 
                    key={idx} 
                    className="flex items-stretch gap-6 group cursor-pointer"
                    onMouseEnter={() => setActiveCard(idx)}
                  >
                    {/* Timeline Dot */}
                    <div className="relative mt-2 hidden sm:flex shrink-0 w-12 items-start justify-center">
                      <div className={cn(
                        "w-4 h-4 rounded-full transition-all duration-300 z-10 border-2",
                        isActive 
                          ? "bg-rose-500 border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)] scale-125" 
                          : "bg-slate-200 border-slate-300 group-hover:border-rose-500/50"
                      )} />
                    </div>

                    {/* Timeline Card */}
                    <Card className={cn(
                      "w-full transition-all duration-500 ease-out bg-white backdrop-blur-sm border-slate-200",
                      isActive 
                        ? "scale-105 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.2)] opacity-100 z-20" 
                        : "opacity-50 hover:opacity-75 scale-100 z-10 shadow-sm"
                    )}>
                      <CardHeader className="pb-2">
                        <CardTitle className={cn(
                          "flex items-center gap-3 text-xl transition-colors duration-300",
                          isActive ? "text-rose-500" : "text-slate-900"
                        )}>
                          <Icon className="w-5 h-5" />
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-slate-600 text-base">
                          {item.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (Interactive Canvas) */}
          <div ref={containerRef} className="relative rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xl flex flex-col h-[500px] lg:h-auto">
            
            {/* Header Tabs */}
            <div className="flex w-full border-b border-slate-200 bg-slate-50 z-20">
              <div className={cn(
                "flex-1 py-4 text-center text-sm font-semibold tracking-widest uppercase transition-all duration-500",
                activeCard <= 1 ? "text-red-500 bg-red-500/10 shadow-[inset_0_-2px_0_rgba(239,68,68,1)]" : "text-slate-500"
              )}>
                Before
              </div>
              <div className={cn(
                "flex-1 py-4 text-center text-sm font-semibold tracking-widest uppercase transition-all duration-500",
                activeCard === 2 ? "text-rose-500 bg-rose-500/10 shadow-[inset_0_-2px_0_rgba(244,63,94,1)]" : "text-slate-500"
              )}>
                Processing
              </div>
              <div className={cn(
                "flex-1 py-4 text-center text-sm font-semibold tracking-widest uppercase transition-all duration-500",
                activeCard === 3 ? "text-rose-500 bg-rose-500/20 shadow-[inset_0_-2px_0_rgba(244,63,94,1)]" : "text-slate-500"
              )}>
                After
              </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center">
              
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-100 pointer-events-none" />

              {/* Central GSAP SVG Layer (All paths are always in DOM) */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none" 
                viewBox="0 0 1000 600" 
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Challenge Phase: Jagged red lines connecting chaos to center */}
                {CHALLENGE_LINES.map((d, i) => (
                  <path 
                    key={`challenge-${i}`}
                    className="challenge-line"
                    d={d}
                    stroke="#ef4444"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow-red)"
                    opacity="0"
                  />
                ))}

                {/* Outcome Phase: Smooth blue curves */}
                {OUTCOME_LINES.map((line) => (
                  <path 
                    key={line.id}
                    id={line.id}
                    className="outcome-line"
                    d={line.d}
                    stroke="#f43f5e"
                    strokeWidth="4"
                    fill="none"
                    filter="url(#glow-blue)"
                    opacity="0"
                  />
                ))}

                {/* Outcome Phase: Traveling data packets */}
                {OUTCOME_LINES.map((_, i) => (
                  <circle 
                    key={`packet-${i}`}
                    className="data-packet"
                    r="6"
                    fill="#ffffff"
                    filter="url(#glow-blue)"
                    opacity="0"
                  />
                ))}

                {/* Context & Challenge Phases: Chaotic Nodes */}
                {CHAOS_NODES.map((node, i) => (
                  <circle
                    key={`node-${i}`}
                    className="chaos-node"
                    cx={node.cx}
                    cy={node.cy}
                    r={node.r}
                    fill={node.color}
                    filter="url(#glow-red)"
                  />
                ))}
              </svg>

              {/* DOM Overlay Layer for Icons/Static Elements */}
              <div className="absolute inset-0 pointer-events-none">
                
                {/* Center Node (AI Chip) */}
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  {/* Central Glow Background */}
                  <div className="center-chip-glow absolute inset-0 bg-rose-500 rounded-full blur-[40px] opacity-0" />
                  
                  <div className={cn(
                    "center-chip-card relative p-4 rounded-xl border transition-all duration-700 backdrop-blur-md flex items-center justify-center bg-white border-slate-200 shadow-xl"
                  )}>
                    <Cpu className="w-10 h-10 text-rose-500" />
                  </div>
                </div>

                {/* Right Nodes (After) */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Hexagon 1 */}
                  <div className="outcome-hexagon absolute left-[85%] top-[25%] -translate-x-1/2 -translate-y-1/2 opacity-25">
                    <div className="relative w-16 h-16 flex items-center justify-center animate-pulse-slow">
                      <div className="absolute inset-0 bg-rose-500/20" style={{ clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)' }} />
                      <div className="absolute inset-[2px] bg-slate-50" style={{ clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)' }} />
                      <div className="absolute inset-[2px] border border-rose-500/30" style={{ clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)' }} />
                      <Hexagon className="w-6 h-6 text-rose-500 z-10" />
                    </div>
                  </div>
                  
                  {/* Hexagon 2 */}
                  <div className="outcome-hexagon absolute left-[85%] top-[50%] -translate-x-1/2 -translate-y-1/2 opacity-25">
                    <div className="relative w-16 h-16 flex items-center justify-center animate-pulse-slow" style={{ animationDelay: '0.5s' }}>
                      <div className="absolute inset-0 bg-rose-500/20" style={{ clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)' }} />
                      <div className="absolute inset-[2px] bg-slate-50" style={{ clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)' }} />
                      <div className="absolute inset-[2px] border border-rose-500/30" style={{ clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)' }} />
                      <Hexagon className="w-6 h-6 text-rose-500 z-10" />
                    </div>
                  </div>

                  {/* Hexagon 3 */}
                  <div className="outcome-hexagon absolute left-[85%] top-[75%] -translate-x-1/2 -translate-y-1/2 opacity-25">
                    <div className="relative w-16 h-16 flex items-center justify-center animate-pulse-slow" style={{ animationDelay: '1s' }}>
                      <div className="absolute inset-0 bg-rose-500/20" style={{ clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)' }} />
                      <div className="absolute inset-[2px] bg-slate-50" style={{ clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)' }} />
                      <div className="absolute inset-[2px] border border-rose-500/30" style={{ clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)' }} />
                      <Hexagon className="w-6 h-6 text-rose-500 z-10" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 10px rgba(244,63,94,0.3)); }
          50% { opacity: .7; filter: drop-shadow(0 0 20px rgba(244,63,94,0.8)); }
        }
      `}} />
    </section>
  );
}
