"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description?: string;
  icon?: React.ElementType;
  subServices: string[];
  ctaText?: string;
  ctaLink?: string;
  color?: string;
  delay?: number;
}

export function ServiceCard({
  title,
  description,
  icon: Icon,
  subServices,
  ctaText = "Talk To A Data Architect",
  ctaLink = "/#contact",
  color = "#3b82f6",
  delay = 0,
}: ServiceCardProps) {
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative flex flex-col h-full bg-slate-950/60 border border-white/10 rounded-3xl p-8 hover:bg-slate-900/80 hover:border-white/20 transition-all backdrop-blur-sm overflow-hidden shadow-xl"
    >
      {/* Background Hover Glow */}
      <div 
        className="absolute top-0 right-0 w-48 h-48 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ backgroundColor: color }}
      />
      
      {Icon && (
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/5 shadow-inner"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          <Icon size={28} />
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
      
      {description && (
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {description}
        </p>
      )}
      
      <div className="flex-grow mb-8">
        <ul className="space-y-3">
          {subServices.map((service, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: color }} />
              <span className="text-sm font-medium text-slate-300">{service}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <Link 
        href="#contact"
        onClick={handleClick}
        className="mt-auto inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold uppercase tracking-widest text-[11px] transition-all border border-white/10 hover:border-white/20 group/btn"
      >
        <span>{ctaText}</span>
        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
}
