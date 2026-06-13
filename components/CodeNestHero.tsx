"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Menu,
  X,
  Database,
  Layers,
  TrendingUp,
  Server,
  Activity,
  Cpu,
  Network,
  CheckCircle
} from "lucide-react";
import Hls from "hls.js";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Visualizer Types
type TabType = "Data Engineering" | "Data Warehousing" | "Analytics" | "Cloud Platform";

interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ComponentType<any>;
}

const tabs: TabConfig[] = [
  { id: "Data Engineering", label: "Data Engineering", icon: Database },
  { id: "Data Warehousing", label: "Data Warehousing", icon: Layers },
  { id: "Analytics", label: "Analytics", icon: TrendingUp },
  { id: "Cloud Platform", label: "Cloud Platform", icon: Server },
];

export function CodeNestHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("Data Engineering");

  // Initialize HLS player for background video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const streamUrl =
      "https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8";

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
    } else if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: false, // Stability in sandbox
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      return () => {
        hls.destroy();
      };
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between overflow-hidden font-sans">
      
      {/* 1. Background & Layout */}
      
      {/* HLS Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 mix-blend-multiply"
        />
        {/* Overlays: left-to-right gradient & bottom-up gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent" />
      </div>

      {/* Grid System (Thin vertical grid lines at 25%, 50%, 75% - visible on desktop) */}
      <div className="absolute inset-0 hidden md:grid grid-cols-4 pointer-events-none z-10">
        <div className="border-r border-slate-200 h-full" />
        <div className="border-r border-slate-200 h-full" />
        <div className="border-r border-slate-200 h-full" />
        <div className="h-full" />
      </div>

      {/* Central Glow (Cyan/Dark Green Ellipse Glow with 25px blur) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 pointer-events-none z-10 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="ellipseGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="25" />
            </filter>
          </defs>
          <ellipse
            cx="400"
            cy="150"
            rx="300"
            ry="90"
            fill="url(#glowGradient)"
            filter="url(#ellipseGlow)"
          />
          <defs>
            <radialGradient id="glowGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(400 150) rotate(90) scale(90 300)">
              <stop stopColor="#f43f5e" stopOpacity="0.8" />
              <stop offset="0.6" stopColor="#be123c" stopOpacity="0.4" />
              <stop offset="1" stopColor="#f8fafc" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* 4. Global Navigation */}
      <header className="relative w-full z-30 px-6 md:px-12 py-6 border-b border-slate-200 backdrop-blur-sm bg-white/50 flex justify-between items-center">
        {/* Company Logo */}
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-xl overflow-hidden shadow-md border border-slate-200/50 flex-shrink-0">
            <img 
              src="/Avismita%20Technologies%20Logo.png" 
              alt="Avismita Technologies Logo" 
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-extrabold text-lg md:text-xl tracking-widest text-slate-900 font-mono leading-none">
              AVISMITA
            </span>
            <span className="text-[9px] font-bold text-rose-500 tracking-widest uppercase mt-1">
              TECHNOLOGIES
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-10">
          {[
            { label: "WHAT WE DO", href: "#what-we-do" },
            { label: "IMPACT", href: "#impact" },
            { label: "ABOUT", href: "#about" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-semibold tracking-widest text-slate-600 hover:text-rose-500 transition-colors font-sans"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Button (Desktop) */}
        <div className="hidden md:block">
          <a href="#contact" className="inline-block px-5 py-2 border border-slate-200 hover:border-rose-500 rounded-full text-xs font-bold tracking-widest transition-all hover:bg-slate-100 text-slate-900">
            CONSULTING
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-900 hover:text-rose-500 transition-colors p-2 z-40"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Full-Screen Overlay Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-50/95 backdrop-blur-md z-30 flex flex-col justify-center items-center space-y-8 animate-in fade-in duration-200">
          {[
            { label: "WHAT WE DO", href: "#what-we-do" },
            { label: "IMPACT", href: "#impact" },
            { label: "ABOUT", href: "#about" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-bold tracking-widest text-slate-900 hover:text-rose-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="px-8 py-3 bg-rose-500 text-white font-bold tracking-widest rounded-full hover:bg-rose-600 transition-opacity text-sm inline-block shadow-sm"
          >
            CONSULTING
          </a>
        </div>
      )}

      {/* Main Hero Container - 2 Column Split Grid */}
      <main className="relative flex-1 w-full max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24 z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column (Content, Card, Text) */}
        <div className="lg:col-span-7 flex flex-col justify-center items-start text-left">
          {/* 2. Liquid Glass Card (Shifted exactly 50px upwards) */}
          <div className="w-[200px] h-[200px] rounded-2xl bg-white/80 border border-slate-200 shadow-sm backdrop-blur p-5 flex flex-col justify-between items-start translate-y-[-50px] mb-2 group hover:scale-[1.02] transition-transform duration-300">
            <div className="flex justify-between items-center w-full">
              <span className="text-[14px] font-bold text-rose-500 tracking-widest uppercase font-mono">
                [ 2025 ]
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            </div>
            <div>
              <h3 className="text-[18px] leading-tight font-light text-slate-900 tracking-wide">
                Taught by <br />
                <span className="font-instrument italic font-normal text-rose-500">
                  Industry
                </span>{" "}
                Professionals
              </h3>
              <p className="text-[11px] text-slate-500 font-sans mt-2 leading-relaxed">
                Curated by data analysts and systems architects to meet production demands.
              </p>
            </div>
          </div>

          {/* Hero Content & Typography */}
          <div className="flex flex-col space-y-6 max-w-xl -mt-6">
            {/* Eyebrow */}
            <span className="text-[11px] font-bold tracking-widest uppercase text-rose-500 font-jakarta">
              Career-Ready Curriculum
            </span>

            {/* Main Headline (Updated) */}
            <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-extrabold uppercase tracking-tight leading-[1.05] text-slate-900 font-sans">
              Build Data and AI Systems That Scale With Your Business
              <span className="text-rose-500">.</span>
            </h1>

            {/* Description (Updated) */}
            <p className="text-[14px] text-slate-600 leading-relaxed max-w-[512px] font-sans">
              Most systems perform well early but begin breaking as data grows in volume and complexity. Pipelines slow down, dashboards lose reliability and decision making becomes difficult. We design data platforms that remain stable, efficient and scalable in real environments.
            </p>

            {/* Primary CTA */}
            <div className="pt-4">
              <a 
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-rose-500 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-rose-600 hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all cursor-pointer shadow-sm"
              >
                <span>Get Started</span>
                <ArrowRight size={14} className="stroke-[2.5]" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column (The Interactive Visualizer Card) */}
        <div className="lg:col-span-5 w-full flex justify-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="w-full max-w-md"
          >
            <Card className="bg-white/80 backdrop-blur-xl border-slate-200 shadow-xl overflow-hidden rounded-2xl">
              <CardContent className="p-5 flex flex-col space-y-5">
                
                {/* Sliding Pill Tab Navigation (Custom Green Theme) */}
                <div className="flex flex-wrap p-1 rounded-xl bg-slate-100 border border-slate-200 gap-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isSelected = activeTab === tab.id;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex items-center justify-center gap-2 px-2.5 py-2 text-[10px] font-bold rounded-lg transition-colors duration-200 flex-1 min-w-[90px] ${
                          isSelected
                            ? "text-rose-500"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        {isSelected && (
                          <motion.div
                            layoutId="activeTabPill"
                            className="absolute inset-0 bg-white border border-slate-200 rounded-lg shadow-sm"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <Icon className="h-3 w-3 relative z-10" />
                        <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Visualizer Display Screen */}
                <div className="relative h-64 w-full rounded-xl bg-slate-50 border border-slate-200 p-5 flex flex-col justify-center items-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

                  <AnimatePresence mode="wait">
                    {activeTab === "Analytics" && <AnalyticsVisualizer key="analytics" />}
                    {activeTab === "Data Engineering" && <DataEngineeringVisualizer key="de" />}
                    {activeTab === "Data Warehousing" && <DataWarehousingVisualizer key="dw" />}
                    {activeTab === "Cloud Platform" && <CloudPlatformVisualizer key="cloud" />}
                  </AnimatePresence>
                </div>

                {/* Dashboard Meta Info */}
                <div className="flex items-center justify-between text-[10px] text-slate-500 px-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    Simulating Active Node Pipelines
                  </span>
                  <span>Click tabs to toggle feeds</span>
                </div>

              </CardContent>
            </Card>
          </motion.div>
        </div>

      </main>
    </div>
  );
}

// =====================================================
// DATA VISUALIZERS (Updated with CodeNest Green theme)
// =====================================================

function AnalyticsVisualizer() {
  const bars = [
    { label: "Jan", val: "65%" },
    { label: "Feb", val: "85%" },
    { label: "Mar", val: "45%" },
    { label: "Apr", val: "95%" },
    { label: "May", val: "70%" },
    { label: "Jun", val: "90%" },
    { label: "Jul", val: "55%" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className="w-full h-full flex flex-col justify-between"
    >
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-semibold text-rose-500 flex items-center gap-1.5">
          <TrendingUp className="h-3 w-3" /> Real-time Query Speeds
        </span>
        <span className="text-[9px] text-slate-500 font-mono">Aggregation Rate: 4.8M ops/sec</span>
      </div>

      <div className="flex-1 flex items-end justify-between px-1 gap-2 h-36">
        {bars.map((bar, i) => (
          <div key={bar.label} className="flex-1 flex flex-col items-center h-full justify-end">
            <div className="w-full bg-slate-100 rounded-t-sm h-full flex items-end relative overflow-hidden">
              <motion.div
                initial={{ height: "0%" }}
                animate={{ height: bar.val }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: "easeOut"
                }}
                className="w-full bg-gradient-to-t from-rose-300 via-rose-400 to-rose-500 rounded-t-sm"
              />
            </div>
            <span className="text-[9px] text-slate-500 mt-2 font-medium">{bar.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function DataEngineeringVisualizer() {
  const pipelines = [
    { id: 1, duration: 2.8, delay: 0 },
    { id: 2, duration: 3.5, delay: 0.5 },
    { id: 3, duration: 2.2, delay: 0.2 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col justify-between"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-rose-500 flex items-center gap-1.5">
          <Database className="h-3 w-3" /> Data Ingestion Pipeline
        </span>
        <span className="text-[9px] text-rose-500 font-mono flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-rose-500 animate-ping" /> Ingesting
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-5 relative px-2">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-1.5 rounded-lg bg-white border border-slate-200 z-10 shadow-sm">
          <Cpu className="h-4 w-4 text-rose-500" />
          <span className="text-[7px] text-slate-500 mt-0.5 font-mono">Sources</span>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-1.5 rounded-lg bg-white border border-slate-200 z-10 shadow-sm">
          <Network className="h-4 w-4 text-rose-500" />
          <span className="text-[7px] text-slate-500 mt-0.5 font-mono">Cluster</span>
        </div>

        <div className="w-full h-full flex flex-col justify-center space-y-6 pl-10 pr-10">
          {pipelines.map((pipe) => (
            <div key={pipe.id} className="relative w-full h-0.5 bg-slate-200 rounded-full">
              <div className="absolute inset-0 bg-rose-500/10" />
              <motion.div
                initial={{ left: "0%" }}
                animate={{ left: "100%" }}
                transition={{
                  duration: pipe.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: pipe.delay
                }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e] border border-white"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function DataWarehousingVisualizer() {
  const radius = 40;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const percentage = 84;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full h-full flex flex-col justify-between"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-rose-500 flex items-center gap-1.5">
          <Layers className="h-3 w-3" /> Storage Index Capacity
        </span>
        <span className="text-[9px] text-slate-500 font-mono">Hot Disk Allocation</span>
      </div>

      <div className="flex-1 grid grid-cols-2 items-center gap-2">
        <div className="flex justify-center items-center relative h-28">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-slate-200"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-rose-500"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0 0 4px rgba(244, 63, 94, 0.4))"
              }}
            />
          </svg>
          <div className="absolute flex flex-col justify-center items-center text-center">
            <span className="text-sm font-bold text-slate-900 font-mono">{percentage}%</span>
            <span className="text-[7px] text-slate-400 font-medium uppercase tracking-wider">Used</span>
          </div>
        </div>

        <div className="flex flex-col space-y-2 justify-center">
          <div className="p-2 rounded-lg bg-white shadow-sm border border-slate-200">
            <div className="text-[8px] text-slate-500 font-medium">TOTAL SPACE</div>
            <div className="text-xs font-bold text-slate-900 font-mono">1.24 Petabytes</div>
          </div>
          <div className="p-2 rounded-lg bg-white shadow-sm border border-slate-200">
            <div className="text-[8px] text-slate-500 font-medium">REDUNDANCY</div>
            <div className="text-xs font-bold text-rose-500 font-mono flex items-center gap-1">
              <CheckCircle className="h-2.5 w-2.5" /> Triple Active
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CloudPlatformVisualizer() {
  const nodes = [
    { id: "us-east-1", x: "25%", y: "20%" },
    { id: "eu-west-1", x: "75%", y: "30%" },
    { id: "ap-south-1", x: "35%", y: "70%" },
    { id: "sa-east-1", x: "70%", y: "75%" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col justify-between"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-rose-500 flex items-center gap-1.5">
          <Server className="h-3 w-3" /> Orchestration Nodes
        </span>
        <span className="text-[9px] text-rose-500 font-mono">Cluster Healthy</span>
      </div>

      <div className="flex-1 relative w-full h-28">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1="25%" y1="20%" x2="75%" y2="30%" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="25%" y1="20%" x2="35%" y2="70%" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="75%" y1="30%" x2="70%" y2="75%" stroke="#e2e8f0" strokeWidth="1" />
          <line x1="35%" y1="70%" x2="70%" y2="75%" stroke="#e2e8f0" strokeWidth="1" />
        </svg>

        {nodes.map((node) => (
          <motion.div
            key={node.id}
            style={{ left: node.x, top: node.y }}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 2px rgba(244, 63, 94, 0.2)",
                "0 0 12px rgba(244, 63, 94, 0.5)",
                "0 0 2px rgba(244, 63, 94, 0.2)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-white border border-rose-500/40 flex flex-col items-center justify-center min-w-[65px] shadow-sm"
          >
            <Cpu className="h-2.5 w-2.5 text-rose-500 mb-0.5" />
            <span className="text-[7px] text-slate-900 font-semibold font-mono">{node.id}</span>
            <span className="text-[5px] text-slate-500 font-mono">99.9% uptime</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default CodeNestHero;
