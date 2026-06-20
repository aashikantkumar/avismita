"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTABlockProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function CTABlock({
  title = "Ready to transform your data?",
  description = "Partner with our elite engineering team to build scalable, high-performance data architectures.",
  ctaText = "Discuss Your Data Project",
  ctaLink = "#contact",
}: CTABlockProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (ctaLink.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(ctaLink.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative py-20 md:py-24 px-6 md:px-12 bg-slate-950 border-t border-white/5 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Metallic grid overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 80%)'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            {title}
          </h2>
          <p className="text-base md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          
          <Link 
            href={ctaLink}
            onClick={handleClick}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold uppercase tracking-widest text-xs md:text-sm transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_35px_rgba(37,99,235,0.5)] group/cta"
          >
            <span>{ctaText}</span>
            <ArrowRight size={16} className="group-hover/cta:translate-x-1 transition-transform stroke-[2.5]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
