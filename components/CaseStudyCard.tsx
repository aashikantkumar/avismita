"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, TrendingUp, Cpu } from "lucide-react";
import Link from "next/link";

interface CaseStudyCardProps {
  title: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  delay?: number;
}

export function CaseStudyCard({
  title,
  challenge,
  solution,
  results,
  technologies,
  delay = 0,
}: CaseStudyCardProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative bg-slate-950/40 border border-white/10 rounded-3xl p-8 lg:p-12 hover:bg-slate-900/60 hover:border-white/20 transition-all backdrop-blur-md overflow-hidden flex flex-col h-full shadow-2xl"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-700" />

      {/* Header */}
      <div className="mb-10 relative z-10">
        <h3 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
          {title}
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 flex-grow relative z-10 mb-10">
        {/* Left Column: Challenge & Solution */}
        <div className="space-y-8">
          <div>
            <h4 className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              The Challenge
            </h4>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              {challenge}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              The Solution
            </h4>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              {solution}
            </p>
          </div>
        </div>

        {/* Right Column: Results & Technologies */}
        <div className="space-y-8">
          <div>
            <h4 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <TrendingUp size={14} className="text-blue-500" />
              Key Results
            </h4>
            <ul className="space-y-3">
              {results.map((result, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-blue-500" />
                  <span className="text-sm md:text-base font-semibold text-white">{result}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Cpu size={14} className="text-indigo-500" />
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300 font-bold uppercase tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-auto pt-8 border-t border-white/10 relative z-10 flex justify-start">
        <Link
          href="#contact"
          onClick={handleClick}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] group/btn"
        >
          <span>Discuss Your Data Project</span>
          <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform stroke-[2.5]" />
        </Link>
      </div>
    </motion.div>
  );
}
