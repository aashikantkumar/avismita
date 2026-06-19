"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Snowflake, Database, Cloud, Hexagon, Server, Zap, Shield } from "lucide-react";
import { FAQSection } from "@/components/organisms/FAQSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

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
      transform: translateZ(0);
      filter:
          drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent))
          drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }

  .premium-depth-card {
      background: linear-gradient(145deg, #090e18 0%, #020617 100%);
      box-shadow:
          0 40px 100px -20px rgba(0, 0, 0, 0.6),
          0 20px 40px -20px rgba(0, 0, 0, 0.4),
          inset 0 1px 2px rgba(255, 255, 255, 0.05),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.06);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(244,63,94,0.15) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: linear-gradient(180deg, #0f172a 0%, #090d16 100%);
      box-shadow:
          0 10px 20px rgba(0, 0, 0, 0.4),
          inset 0 1px 1px rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(9, 13, 22, 0.7) 100%);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.08),
          0 25px 50px -12px rgba(0, 0, 0, 0.5),
          inset 0 1px 1px rgba(255, 255, 255, 0.05);
  }
`;

const platformItems = [
  { name: "Databricks", detail: "Unified Analytics", Icon: Hexagon, color: "text-red-500", shell: "from-red-500/20 to-orange-500/20", border: "border-red-500/30" },
  { name: "Snowflake", detail: "Data Cloud", Icon: Snowflake, color: "text-blue-500", shell: "from-blue-400/20 to-blue-300/20", border: "border-blue-400/30" },
  { name: "Microsoft Fabric", detail: "End-to-End Analytics", Icon: Database, color: "text-cyan-600", shell: "from-cyan-500/20 to-blue-600/20", border: "border-cyan-500/30" },
  { name: "AWS", detail: "Cloud Infrastructure", Icon: Cloud, color: "text-orange-500", shell: "from-orange-400/20 to-yellow-500/20", border: "border-orange-400/30" },
  { name: "Azure", detail: "Enterprise Cloud", Icon: Server, color: "text-blue-600", shell: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/30" },
];

const useStaticCinematicExperience = () => {
  const [isStatic, setIsStatic] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)");
    const syncPreference = () => setIsStatic(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  return isStatic;
};

const DefaultCardDescription = () => (
  <div className="space-y-4 text-zinc-300 text-sm md:text-base lg:text-lg font-medium leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-2xl relative z-50">
    <p>Avismita Technologies builds scalable data systems designed for real business environments. We focus on architecture, pipelines and analytics systems that remain stable as data grows in volume and complexity. Our approach emphasizes reliability, performance and long term maintainability.</p>
    <p>Our team focuses on building scalable production systems using modern platforms including Databricks, Snowflake, Microsoft Fabric, AWS and Azure. We solve complex engineering challenges with a strong focus on reliability, scalability and long term maintainability.</p>
  </div>
);

function DataArchitectureMockup({ mockupRef }: { mockupRef?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">
      <div
        ref={mockupRef}
        className="relative w-[340px] h-[580px] rounded-[2rem] bg-[#090d16]/90 border border-slate-800/80 shadow-2xl flex flex-col p-6 will-change-transform transform-style-3d overflow-hidden"
      >
        <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

        <div className="text-center mb-6 z-10">
          <h3 className="text-xl font-bold text-white tracking-widest uppercase drop-shadow-sm">Data Architecture</h3>
          <div className="w-12 h-1 bg-rose-500 mx-auto mt-2 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.6)]" />
        </div>

        <div className="flex flex-col gap-4 relative z-10">
          {platformItems.map(({ name, detail, Icon, color, shell, border }) => (
            <div key={name} className="phone-widget widget-depth rounded-2xl p-4 flex items-center bg-[#090d16]/80 border border-slate-800 shadow-sm">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${shell} flex items-center justify-center mr-4 border ${border}`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div>
                <div className="text-white font-bold text-lg">{name}</div>
                <div className="text-zinc-400 text-xs">{detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="floating-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-rose-500/20 to-rose-900/10 flex items-center justify-center border border-rose-400/30 shadow-inner">
          <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-rose-300" />
        </div>
        <div>
          <p className="text-white text-xs lg:text-sm font-bold tracking-tight">High Performance</p>
          <p className="text-zinc-400 text-[10px] lg:text-xs font-medium">Scalable pipelines</p>
        </div>
      </div>

      <div className="floating-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-indigo-500/20 to-indigo-900/10 flex items-center justify-center border border-indigo-400/30 shadow-inner">
          <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-200" />
        </div>
        <div>
          <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Reliability</p>
          <p className="text-zinc-400 text-[10px] lg:text-xs font-medium">Long term maintainability</p>
        </div>
      </div>
    </div>
  );
}

function SystemsCard({
  cardHeading,
  cardDescription,
  mainCardRef,
  mockupRef,
  revealClassName = "main-card gsap-reveal",
}: {
  cardHeading: string;
  cardDescription: React.ReactNode;
  mainCardRef?: React.RefObject<HTMLDivElement | null>;
  mockupRef?: React.RefObject<HTMLDivElement | null>;
  revealClassName?: string;
}) {
  return (
    <div
      ref={mainCardRef}
      className={cn(
        revealClassName,
        "premium-depth-card relative overflow-hidden flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
      )}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/dark_data_architecture_bg.png"
          alt="Who We Are Background"
          fill
          sizes="100vw"
          className="object-cover opacity-35 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/85 to-transparent" />
      </div>

      <div className="card-sheen" aria-hidden="true" />

      <div className="relative w-full h-full max-w-[80rem] mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-2 items-center lg:gap-16 z-10 py-6 lg:py-0">
        <div className="card-left-text order-2 lg:order-1 flex flex-col justify-center text-center lg:text-left z-50 w-full lg:max-w-none px-4 lg:px-0">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-normal text-white mb-6 drop-shadow-sm">
            {cardHeading}
          </h2>
          {cardDescription}
        </div>

        <div className="mockup-scroll-wrapper order-1 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10" style={{ perspective: "1000px" }}>
          <DataArchitectureMockup mockupRef={mockupRef} />
        </div>
      </div>
    </div>
  );
}

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
  cardDescription = <DefaultCardDescription />,
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const isStaticExperience = useStaticCinematicExperience();

  useEffect(() => {
    if (isStaticExperience) return;

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
            rotationY: xVal * 8,
            rotationX: -yVal * 8,
            ease: "power3.out",
            duration: 1.1,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isStaticExperience]);

  useEffect(() => {
    if (isStaticExperience || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(".text-brand", { autoAlpha: 0, y: -34, scale: 0.94, letterSpacing: "0.12em" });
      gsap.set(".text-track", { autoAlpha: 0, y: 46, scale: 0.9, filter: "blur(16px)", rotationX: -14 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 140, autoAlpha: 1 });
      gsap.set([".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cinematic-stage", { opacity: 0.45 });
      gsap.set(".cinematic-stage-1", { opacity: 1 });

      const introTl = gsap.timeline({ delay: 0.2 });
      introTl
        .to(".text-brand", { duration: 1.1, autoAlpha: 1, y: 0, scale: 1, letterSpacing: "0.3em", ease: "power3.out" })
        .to(".text-track", { duration: 1.25, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" }, "-=0.72")
        .to(".text-days", { duration: 1.05, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=0.88");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${Math.min(4300, Math.max(3200, window.innerHeight * 3.8))}`,
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        .to(".cinematic-stage-1", { opacity: 0.45, duration: 0.2 }, 0)
        .to(".cinematic-stage-2", { opacity: 1, duration: 0.2 }, 0.1)
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.1, filter: "blur(16px)", opacity: 0.2, ease: "power2.inOut", duration: 1.45 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 1.45 }, 0)
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.05 })
        .fromTo(".mockup-scroll-wrapper",
          { y: 220, z: -360, rotationX: 38, rotationY: -22, autoAlpha: 0, scale: 0.7 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.7 }, "-=0.48"
        )
        .fromTo(".phone-widget", { y: 28, autoAlpha: 0, scale: 0.97 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.1, ease: "back.out(1.15)", duration: 1.0 }, "-=1.0")
        .fromTo(".floating-badge", { y: 70, autoAlpha: 0, scale: 0.8, rotationZ: -6 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.35)", duration: 1.0, stagger: 0.14 }, "-=1.25")
        .to({}, { duration: 1.1 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .to(".cinematic-stage-2", { opacity: 0.45, duration: 0.2 }, "pullback")
        .to(".cinematic-stage-3", { opacity: 1, duration: 0.2 }, "pullback")
        .to([".mockup-scroll-wrapper", ".floating-badge"], {
          scale: 0.92, y: -34, z: -180, autoAlpha: 0, ease: "power3.in", duration: 0.9, stagger: 0.04,
        }, "pullback")
        .to(".main-card", {
          width: "85vw",
          height: "85vh",
          borderRadius: "40px",
          ease: "expo.inOut",
          duration: 1.15
        }, "pullback+=0.05")
        .to(".company-info-reveal", { autoAlpha: 1, pointerEvents: "auto", duration: 0.35 }, "pullback+=0.34")
        .to(".main-card", { y: -window.innerHeight - 220, ease: "power3.in", duration: 1.0 }, "pullback+=0.5")
        .fromTo(".company-info-reveal .stagger-item",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, ease: "back.out(1.15)", duration: 0.85 },
          "pullback+=0.82"
        )
        .to({}, { duration: 1.2 });
    }, containerRef);

    return () => ctx.revert();
  }, [isStaticExperience]);

  if (isStaticExperience) {
    return (
      <div key="static-hero" className="w-full">
        <section
          id={props.id}
          className={cn("relative w-full overflow-hidden bg-black text-white font-sans antialiased", className)}
          {...props}
        >
          <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
          <div className="film-grain" aria-hidden="true" />
          <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />
          <div className="relative z-10 px-5 py-16 md:px-8 md:py-24">
            <div className="mx-auto max-w-5xl text-center mb-10">
              <p className="text-emerald-400 font-mono text-sm md:text-xl tracking-[0.3em] uppercase mb-3">{brandName}</p>
              <h2 className="text-5xl md:text-7xl font-black leading-none text-white">{tagline1} {tagline2}</h2>
            </div>
            <div className="mx-auto flex justify-center mb-14">
              <SystemsCard cardHeading={cardHeading} cardDescription={cardDescription} revealClassName="" />
            </div>
            <div className="mx-auto max-w-7xl">
              <FAQSection />
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div key="cinematic-hero" className="w-full">
      <div
        ref={containerRef}
        className={cn("relative w-screen h-screen overflow-hidden flex items-center justify-center bg-black text-white font-sans antialiased", className)}
        style={{ perspective: "1500px", zIndex: 100 }}
        {...props}
      >
        <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
        <div className="film-grain" aria-hidden="true" />
        <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

        <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform transform-style-3d">
          <h2 className="text-brand gsap-reveal text-emerald-400 font-mono text-xl md:text-3xl lg:text-4xl tracking-[0.3em] mb-4 uppercase drop-shadow-lg">
            {brandName}
          </h2>
          <h1 className="text-track gsap-reveal text-3d-matte text-6xl md:text-8xl lg:text-[8rem] font-black tracking-normal mb-2 leading-none">
            {tagline1}
          </h1>
          <h1 className="text-days gsap-reveal text-silver-matte text-6xl md:text-8xl lg:text-[8rem] font-black tracking-normal leading-none">
            {tagline2}
          </h1>
        </div>

        <div className="absolute bottom-6 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md md:flex">
          <span className="cinematic-stage cinematic-stage-1">Identity</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span className="cinematic-stage cinematic-stage-2">Systems</span>
          <span className="h-1 w-1 rounded-full bg-white/30" />
          <span className="cinematic-stage cinematic-stage-3">Details</span>
        </div>

        <div className="company-info-reveal absolute inset-0 z-15 flex flex-col items-center justify-center pointer-events-none opacity-0 bg-black overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto px-6">
            <FAQSection />
          </div>
        </div>

        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: "1500px" }}>
          <SystemsCard
            cardHeading={cardHeading}
            cardDescription={cardDescription}
            mainCardRef={mainCardRef}
            mockupRef={mockupRef}
          />
        </div>
      </div>
    </div>
  );
}
