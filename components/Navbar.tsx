"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "LIFECYCLE", href: "/#lifecycle" },
    { label: "SERVICES", href: "/services" },
    { label: "CASE STUDIES", href: "/case-studies" },
    { label: "ENGAGEMENT", href: "/engagement-models" },
    { label: "AUGMENTATION", href: "/resource-augmentation" },
    { label: "ABOUT", href: "/#about" },
  ];

  return (
    <>
      <header className="relative w-full z-50 px-6 md:px-12 py-6 border-b border-white/5 backdrop-blur-md bg-slate-950/40 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3" aria-label="Avismita Technologies Home">
          <div className="relative h-10 w-10 md:h-11 md:w-11 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-slate-950/80 shadow-[0_0_20px_rgba(59,130,246,0.25)]">
            <Image
              src="/Avismita_Technologies_Logo-removebg-preview (1).png"
              alt="Avismita Technologies Logo"
              width={44}
              height={44}
              priority
              className="w-full h-full object-cover scale-110"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-extrabold text-lg md:text-xl tracking-wider text-white font-mono leading-none">
              AVISMITA
            </span>
            <span className="text-[8px] font-bold text-blue-400 tracking-widest uppercase mt-1">
              TECHNOLOGIES
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs font-bold tracking-widest text-slate-400 hover:text-white transition-colors font-mono"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/#contact"
            className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-bold tracking-widest transition-all shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]"
          >
            BOOK DEMO
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          aria-label="Toggle Navigation Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white hover:text-blue-400 transition-colors p-2 z-50"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Full-Screen Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#000000]/98 backdrop-blur-lg z-40 flex flex-col justify-center items-center space-y-8"
          >
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-bold tracking-widest text-white hover:text-blue-400 transition-colors font-mono py-2 px-4 block"
                aria-label={item.label}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-8 py-3 bg-blue-600 text-white font-bold tracking-widest rounded-full hover:bg-blue-500 transition-all text-sm inline-block shadow-lg"
            >
              BOOK DEMO
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
