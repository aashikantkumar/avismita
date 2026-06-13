"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Snowflake, Database, Cloud, Hexagon, Server } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* -------------------------------------------------------------------
     PHYSICAL SKEUOMORPHIC MATERIALS (Restored 3D Depth)
  ---------------------------------------------------------------------- */
  
  /* OUTSIDE THE CARD: Theme-aware text (Shadow in Light Mode, Glow in Dark Mode) */
  .text-3d-matte {
      color: var(--color-foreground);
      text-shadow: 
          0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent), 
          0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 40%, transparent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0); /* Hardware acceleration to prevent WebKit clipping bug */
      filter: 
          drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent)) 
          drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }

  /* INSIDE THE CARD: Hardcoded Silver/White for the dark background, deep rich shadows */
  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) 
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  /* Deep Physical Card with Dynamic Mouse Lighting */
  .premium-depth-card {
      background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.1),
          0 20px 40px -20px rgba(0, 0, 0, 0.05),
          inset 0 1px 2px rgba(255, 255, 255, 1),
          inset 0 -2px 4px rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(0, 0, 0, 0.05);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.4) 0%, transparent 40%);
      mix-blend-mode: normal; transition: opacity 0.3s ease;
  }
  
  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
      box-shadow: 
          0 10px 20px rgba(0,0,0,0.05),
          inset 0 1px 1px rgba(255,255,255,1),
          inset 0 -1px 1px rgba(0,0,0,0.02);
      border: 1px solid rgba(0,0,0,0.05);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%);
      backdrop-filter: blur(24px); 
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 
          0 0 0 1px rgba(0, 0, 0, 0.05),
          0 25px 50px -12px rgba(0, 0, 0, 0.1),
          inset 0 1px 1px rgba(255,255,255,1),
          inset 0 -1px 1px rgba(0,0,0,0.02);
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
}

export function CinematicHero({
  brandName = "AVISMITA",
  tagline1 = "Who We",
  tagline2 = "Are",
  cardHeading = "Scalable Data Systems",
  cardDescription = (
    <div className="space-y-4 text-slate-600 text-sm md:text-base lg:text-lg font-medium leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-2xl relative z-50">
      <p>Avismita Technologies builds scalable data systems designed for real business environments. We focus on architecture, pipelines and analytics systems that remain stable as data grows in volume and complexity. Our approach emphasizes reliability, performance and long term maintainability.</p>
      <p>Our team focuses on building scalable production systems using modern platforms including Databricks, Snowflake, Microsoft Fabric, AWS and Azure. We solve complex engineering challenges with a strong focus on reliability, scalability and long term maintainability.</p>
    </div>
  ),
  className,
  ...props
}: CinematicHeroProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  // 1. High-Performance Mouse Interaction Logic (Using requestAnimationFrame)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 2. Complex Cinematic Scroll Timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".text-brand", { autoAlpha: 0, y: -40, scale: 0.9, letterSpacing: "0.1em" });
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-brand", { duration: 1.5, autoAlpha: 1, y: 0, scale: 1, letterSpacing: "0.3em", ease: "power3.out" })
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" }, "-=1.0")
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.2");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 }, "-=0.8"
        )
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 }, "-=1.5")
        .fromTo(".floating-badge", { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 }, "-=2.0")
        .to({}, { duration: 2.5 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .to({}, { duration: 1.5 })
        .to([".mockup-scroll-wrapper", ".floating-badge"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })
        // Responsive card pullback sizing
        .to(".main-card", {
          width: isMobile ? "92vw" : "85vw",
          height: isMobile ? "92vh" : "85vh",
          borderRadius: isMobile ? "32px" : "40px",
          ease: "expo.inOut",
          duration: 1.8
        }, "pullback")
        .to(".company-info-reveal", { autoAlpha: 1, duration: 0.5 }, "pullback+=0.5")
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 }, "pullback+=0.8")
        .fromTo(".company-info-reveal .stagger-item", 
          { y: 40, opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.2 }, 
          "pullback+=1.2"
        )
        .to({}, { duration: 2.0 }); // Hold on screen to let user read

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-slate-50 text-slate-900 font-sans antialiased", className)}
      style={{ perspective: "1500px", zIndex: 100 }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      {/* BACKGROUND LAYER: Hero Texts */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform transform-style-3d">
        <h2 className="text-brand gsap-reveal text-emerald-400 font-mono text-xl md:text-3xl lg:text-4xl tracking-[0.3em] mb-4 uppercase drop-shadow-lg">
          {brandName}
        </h2>
        <h1 className="text-track gsap-reveal text-3d-matte text-6xl md:text-8xl lg:text-[8rem] font-black tracking-tight mb-2 leading-none">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-silver-matte text-6xl md:text-8xl lg:text-[8rem] font-black tracking-tighter leading-none">
          {tagline2}
        </h1>
      </div>

      {/* REVEALED COMPANY INFO LAYER (Hidden behind the card initially, revealed when card slides up) */}
      <div className="company-info-reveal absolute inset-0 z-15 flex flex-col items-center justify-center pointer-events-none opacity-0 bg-slate-50">
        <div className="w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-8 stagger-item border border-rose-500/20 shadow-sm">
            <Hexagon className="w-8 h-8 text-rose-500" />
          </div>
          <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight stagger-item leading-tight">
            Building the future of <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
              Enterprise Technology
            </span>
          </h3>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl stagger-item mb-12">
            Avismita Technologies partners with global leaders to architect highly scalable data platforms that drive massive growth, operational efficiency, and innovation.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full max-w-4xl border-t border-slate-200 pt-12 stagger-item">
            <div className="flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-slate-900">100<span className="text-rose-500">+</span></span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-3">Projects Shipped</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-slate-900">50<span className="text-rose-500">+</span></span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-3">Global Experts</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-slate-900">99<span className="text-rose-500">%</span></span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-3">System Uptime</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-5xl font-black text-slate-900">24<span className="text-rose-500">/7</span></span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-3">Active Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* FOREGROUND LAYER: The Physical Deep Blue Card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          {/* Added Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/Gemini_Generated_Image_xgugwkxgugwkxgug (1).png"
              alt="Who We Are Background"
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
            {/* Gradient overlay to ensure text remains readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#ffffff] via-[#f8fafc]/80 to-transparent" />
          </div>

          <div className="card-sheen" aria-hidden="true" />

          {/* DYNAMIC RESPONSIVE GRID */}
          <div className="relative w-full h-full max-w-[80rem] mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-2 items-center lg:gap-16 z-10 py-6 lg:py-0">

            {/* 1. LEFT (Desktop) / BOTTOM (Mobile): TEXT CONTENT */}
            <div className="card-left-text order-2 lg:order-1 flex flex-col justify-center text-center lg:text-left z-50 w-full lg:max-w-none px-4 lg:px-0">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 mb-6 drop-shadow-sm">
                {cardHeading}
              </h2>
              {cardDescription}
            </div>

            {/* 2. RIGHT (Desktop) / TOP (Mobile): DATA ARCHITECTURE MOCKUP */}
            <div className="mockup-scroll-wrapper order-1 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>

              {/* Inner wrapper for safe CSS scaling */}
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">

                <div
                  ref={mockupRef}
                  className="relative w-[340px] h-[580px] rounded-[2rem] bg-[#f8fafc] border border-slate-200 shadow-xl flex flex-col p-6 will-change-transform transform-style-3d overflow-hidden"
                >
                  <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                  <div className="text-center mb-6 z-10">
                    <h3 className="text-xl font-bold text-slate-900 tracking-widest uppercase drop-shadow-sm">Data Architecture</h3>
                    <div className="w-12 h-1 bg-rose-500 mx-auto mt-2 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.6)]"></div>
                  </div>

                  <div className="flex flex-col gap-4 relative z-10">
                    {/* Databricks */}
                    <div className="phone-widget widget-depth rounded-2xl p-4 flex items-center bg-white border border-slate-200 shadow-sm">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mr-4 border border-red-500/30">
                        <Hexagon className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <div className="text-slate-900 font-bold text-lg">Databricks</div>
                        <div className="text-slate-500 text-xs">Unified Analytics</div>
                      </div>
                    </div>

                    {/* Snowflake */}
                    <div className="phone-widget widget-depth rounded-2xl p-4 flex items-center bg-white border border-slate-200 shadow-sm">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400/20 to-blue-300/20 flex items-center justify-center mr-4 border border-blue-400/30">
                        <Snowflake className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <div className="text-slate-900 font-bold text-lg">Snowflake</div>
                        <div className="text-slate-500 text-xs">Data Cloud</div>
                      </div>
                    </div>

                    {/* Microsoft Fabric */}
                    <div className="phone-widget widget-depth rounded-2xl p-4 flex items-center bg-white border border-slate-200 shadow-sm">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mr-4 border border-cyan-500/30">
                        <Database className="w-6 h-6 text-cyan-600" />
                      </div>
                      <div>
                        <div className="text-slate-900 font-bold text-lg">Microsoft Fabric</div>
                        <div className="text-slate-500 text-xs">End-to-End Analytics</div>
                      </div>
                    </div>

                    {/* AWS */}
                    <div className="phone-widget widget-depth rounded-2xl p-4 flex items-center bg-white border border-slate-200 shadow-sm">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400/20 to-yellow-500/20 flex items-center justify-center mr-4 border border-orange-400/30">
                        <Cloud className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <div className="text-slate-900 font-bold text-lg">AWS</div>
                        <div className="text-slate-500 text-xs">Cloud Infrastructure</div>
                      </div>
                    </div>

                    {/* Azure */}
                    <div className="phone-widget widget-depth rounded-2xl p-4 flex items-center bg-white border border-slate-200 shadow-sm">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mr-4 border border-blue-500/30">
                        <Server className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-slate-900 font-bold text-lg">Azure</div>
                        <div className="text-slate-500 text-xs">Enterprise Cloud</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Glass Badges */}
                <div className="floating-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-rose-500/20 to-rose-900/10 flex items-center justify-center border border-rose-400/30 shadow-inner">
                    <span className="text-base lg:text-xl drop-shadow-sm" aria-hidden="true">⚡</span>
                  </div>
                  <div>
                    <p className="text-slate-900 text-xs lg:text-sm font-bold tracking-tight">High Performance</p>
                    <p className="text-slate-500 text-[10px] lg:text-xs font-medium">Scalable pipelines</p>
                  </div>
                </div>

                <div className="floating-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-indigo-500/20 to-indigo-900/10 flex items-center justify-center border border-indigo-400/30 shadow-inner">
                    <span className="text-base lg:text-lg drop-shadow-sm" aria-hidden="true">🛡️</span>
                  </div>
                  <div>
                    <p className="text-slate-900 text-xs lg:text-sm font-bold tracking-tight">Reliability</p>
                    <p className="text-slate-500 text-[10px] lg:text-xs font-medium">Long term maintainability</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
