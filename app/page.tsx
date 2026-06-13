"use client";

import { CodeNestHero } from "@/components/CodeNestHero";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import { ImpactTimeline } from "@/components/ImpactTimeline";
import { WhatWeDo } from "@/components/WhatWeDo";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { ContactSection } from "@/components/organisms/contact-section";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-rose-500/20 font-sans">

      <main className="relative z-10 w-full min-h-[120vh] bg-slate-50 flex flex-col text-slate-900 shadow-xl rounded-b-[40px] pb-10 border-b border-slate-200">
        {/* CodeNest High-End Hero Section */}
        <CodeNestHero />

        {/* What We Do Section (Intro & Scroll-Telling Animations) */}
        <WhatWeDo />

        {/* System Impact Timeline */}
        <ImpactTimeline />

        {/* Who We Are Cinematic Hero */}
        <section id="about" className="relative z-20 w-full border-t border-slate-200">
          <CinematicHero />
        </section>

        {/* Contact Form Section (Organism) */}
        <ContactSection />
      </main>

      {/* The Cinematic Footer is injected here */}
      <CinematicFooter />
    </div>
  );
}

