"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Srivatsav",
    feedback: "Avismita transformed our messy data pipelines into a streamlined, automated Databricks architecture. Query times dropped by 80% and our data teams are finally focusing on insights rather than maintenance.",
    rating: 5,
  }
];

export function Testimonials() {
  return (
    <section className="relative w-full bg-[#000000] text-slate-50 py-24 border-t border-white/5 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#000000] to-[#000000] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-widest mb-4">
              Client Success
            </h2>
            <h3 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-sans">
              Trusted by Enterprises
            </h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative bg-slate-950/50 border border-white/10 rounded-2xl p-8 hover:bg-slate-900/80 transition-colors backdrop-blur-sm group flex flex-col justify-between"
            >
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity">
                <Quote size={40} className="text-indigo-400" />
              </div>

              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-8 italic">
                  "{testimonial.feedback}"
                </p>
              </div>

              <div className="mt-auto border-t border-white/10 pt-6">
                <h4 className="text-lg font-bold text-white mb-1">{testimonial.name}</h4>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
