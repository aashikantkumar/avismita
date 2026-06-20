import dynamic from 'next/dynamic';

const DataLifecycleHero = dynamic(() => import('@/components/DataLifecycleHero').then(mod => mod.DataLifecycleHero));
const CinematicHero = dynamic(() => import('@/components/ui/cinematic-landing-hero').then(mod => mod.CinematicHero));
const ImpactTimeline = dynamic(() => import('@/components/ImpactTimeline').then(mod => mod.ImpactTimeline));
const WhyAvismita = dynamic(() => import('@/components/WhyAvismita').then(mod => mod.WhyAvismita));
const TechStack = dynamic(() => import('@/components/TechStack').then(mod => mod.TechStack));
const FounderSection = dynamic(() => import('@/components/FounderSection').then(mod => mod.FounderSection));
const WhyWorkWithUs = dynamic(() => import('@/components/WhyWorkWithUs').then(mod => mod.WhyWorkWithUs));
const CompanyJourney = dynamic(() => import('@/components/CompanyJourney').then(mod => mod.CompanyJourney));
const Testimonials = dynamic(() => import('@/components/Testimonials').then(mod => mod.Testimonials));
const CaseStudiesPreview = dynamic(() => import('@/components/CaseStudiesPreview').then(mod => mod.CaseStudiesPreview));
const WhatWeDo = dynamic(() => import('@/components/WhatWeDo').then(mod => mod.WhatWeDo));
const CinematicFooter = dynamic(() => import('@/components/ui/motion-footer').then(mod => mod.CinematicFooter));
const ContactSection = dynamic(() => import('@/components/organisms/contact-section').then(mod => mod.ContactSection));
import { CTABlock } from '@/components/CTABlock';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 selection:bg-rose-500/20 font-sans">

      <main className="relative z-10 w-full min-h-[120vh] bg-slate-50 flex flex-col text-slate-900 shadow-xl rounded-b-[40px] pb-10 border-b border-slate-200">
        {/* Data Lifecycle Hero Section */}
        <DataLifecycleHero />

        {/* Why Avismita Section */}
        <WhyAvismita />

        {/* Tech Stack Section */}
        <TechStack />

        {/* What We Do Section (Intro & Scroll-Telling Animations) */}
        <WhatWeDo />

        {/* System Impact Timeline */}
        <ImpactTimeline />

        {/* Case Studies Preview */}
        <CaseStudiesPreview />

        {/* Who We Are Cinematic Hero */}
        <section id="about" className="relative z-20 w-full border-t border-slate-200">
          <CinematicHero />
        </section>

        {/* Founder Section */}
        <FounderSection />

        {/* Why Work With Us */}
        <WhyWorkWithUs />

        {/* Company Journey */}
        <CompanyJourney />

        {/* Testimonials */}
        <Testimonials />

        {/* Global CTA */}
        <CTABlock ctaText="Schedule Free Consultation" />

        {/* Contact Form Section (Organism) */}
        <ContactSection />
      </main>

      {/* The Cinematic Footer is injected here */}
      <CinematicFooter />
    </div>
  );
}

