import dynamic from 'next/dynamic';

const DataLifecycleHero = dynamic(() => import('@/components/DataLifecycleHero').then(mod => mod.DataLifecycleHero));
const CinematicHero = dynamic(() => import('@/components/ui/cinematic-landing-hero').then(mod => mod.CinematicHero));
const ImpactTimeline = dynamic(() => import('@/components/ImpactTimeline').then(mod => mod.ImpactTimeline));
const WhatWeDo = dynamic(() => import('@/components/WhatWeDo').then(mod => mod.WhatWeDo));
const CinematicFooter = dynamic(() => import('@/components/ui/motion-footer').then(mod => mod.CinematicFooter));
const ContactSection = dynamic(() => import('@/components/organisms/contact-section').then(mod => mod.ContactSection));
export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-rose-500/20 font-sans">

      <main className="relative z-10 w-full min-h-[120vh] bg-slate-50 flex flex-col text-slate-900 shadow-xl rounded-b-[40px] pb-10 border-b border-slate-200">
        {/* Data Lifecycle Hero Section */}
        <DataLifecycleHero />

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

