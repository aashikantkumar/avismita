"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Database,
  Server,
  TrendingUp,
  Cpu,
  CheckCircle,
  Network,
  Activity,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Types
type TabType = "Data Engineering" | "Data Warehousing" | "Analytics" | "Cloud Platform";

interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ComponentType<any>;
}

// Config data outside of the component
const tabs: TabConfig[] = [
  { id: "Data Engineering", label: "Data Engineering", icon: Database },
  { id: "Data Warehousing", label: "Data Warehousing", icon: Layers },
  { id: "Analytics", label: "Analytics", icon: TrendingUp },
  { id: "Cloud Platform", label: "Cloud Platform", icon: Server },
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<TabType>("Data Engineering");

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden py-16">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      <div className="container max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Static Marketing Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col space-y-8 text-left"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs text-blue-400 w-fit">
              <Activity className="h-3 w-3 animate-pulse" />
              <span className="font-medium">Enterprise AI Core v2.4</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              Build Data and AI Systems That{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Scale
              </span>{" "}
              With Your Business
            </h1>

            <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed">
              Accelerate your intelligence lifecycle. Seamlessly ingest, warehouse, analyze, and orchestrate massive cloud resources inside a single trusted interface.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl px-8 h-12 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Deploy Engine</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="border-slate-800 bg-slate-900/50 hover:bg-slate-900 text-slate-300 hover:text-white rounded-xl px-8 h-12 transition-all"
              >
                Schedule Demo
              </Button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-900">
              <div>
                <div className="text-2xl font-bold text-white">99.99%</div>
                <div className="text-xs text-slate-500">Pipeline Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">&lt;50ms</div>
                <div className="text-xs text-slate-500">Query Latency</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">100+ PB</div>
                <div className="text-xs text-slate-500">Data Ingested</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: The Interactive Visualizer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-xl mx-auto"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <Card className="bg-slate-900/40 backdrop-blur-xl border-slate-800/80 shadow-2xl overflow-hidden rounded-2xl">
                <CardContent className="p-6 flex flex-col space-y-6">
                  
                  {/* Sliding Pill Tab Navigation */}
                  <div className="flex flex-wrap p-1 rounded-xl bg-slate-950/80 border border-slate-900 gap-1">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      const isSelected = activeTab === tab.id;

                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`relative flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-colors duration-200 flex-1 min-w-[110px] ${
                            isSelected
                              ? "text-blue-400"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              layoutId="activeTabPill"
                              className="absolute inset-0 bg-slate-900 border border-slate-800/60 rounded-lg"
                              transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            />
                          )}
                          <Icon className="h-3.5 w-3.5 relative z-10" />
                          <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Interactive Animation Screen */}
                  <div className="relative h-72 w-full rounded-xl bg-slate-950/60 border border-slate-900/80 p-6 flex flex-col justify-center items-center overflow-hidden">
                    {/* Visual Grid Layer */}
                    <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

                    <AnimatePresence mode="wait">
                      {activeTab === "Analytics" && <AnalyticsVisualizer key="analytics" />}
                      {activeTab === "Data Engineering" && <DataEngineeringVisualizer key="de" />}
                      {activeTab === "Data Warehousing" && <DataWarehousingVisualizer key="dw" />}
                      {activeTab === "Cloud Platform" && <CloudPlatformVisualizer key="cloud" />}
                    </AnimatePresence>
                  </div>

                  {/* Card Info Footer */}
                  <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-950 pt-4 px-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Live simulation active
                    </span>
                    <span>Click tabs to toggle feeds</span>
                  </div>

                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// STATE 1: Analytics Visualizer (Staggered Bar Chart)
// ----------------------------------------------------
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
        <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
          <TrendingUp className="h-3 w-3" /> Real-time Query Speeds
        </span>
        <span className="text-[10px] text-slate-500 font-mono">Aggregation Rate: 4.8M ops/sec</span>
      </div>

      <div className="flex-1 flex items-end justify-between px-2 gap-3 h-40">
        {bars.map((bar, i) => (
          <div key={bar.label} className="flex-1 flex flex-col items-center h-full justify-end">
            <div className="w-full bg-slate-900 rounded-t-md h-full flex items-end relative overflow-hidden">
              {/* Animated Growth Bar */}
              <motion.div
                initial={{ height: "0%" }}
                animate={{ height: bar.val }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: "easeOut"
                }}
                className="w-full bg-gradient-to-t from-blue-600 via-cyan-500 to-cyan-400 rounded-t-md relative group"
              >
                {/* Shiny overlay */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </div>
            <span className="text-[10px] text-slate-500 mt-2 font-medium">{bar.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// STATE 2: Data Engineering (Pipeline glowing dots)
// ----------------------------------------------------
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
        <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1.5">
          <Database className="h-3 w-3" /> Data Ingestion Pipeline
        </span>
        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" /> Active
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-6 relative px-4">
        {/* Source and Destination Icons */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900 border border-slate-800 z-10">
          <Cpu className="h-5 w-5 text-indigo-400" />
          <span className="text-[8px] text-slate-500 mt-1 font-mono">Sources</span>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-2 rounded-xl bg-slate-900 border border-slate-800 z-10">
          <Network className="h-5 w-5 text-purple-400" />
          <span className="text-[8px] text-slate-500 mt-1 font-mono">Cluster</span>
        </div>

        {/* Lines and glowing dots */}
        <div className="w-full h-full flex flex-col justify-center space-y-8 pl-12 pr-12">
          {pipelines.map((pipe) => (
            <div key={pipe.id} className="relative w-full h-1 bg-slate-900/80 rounded-full overflow-visible">
              {/* Base Connector Line */}
              <div className="absolute inset-0 bg-slate-800/50" />
              {/* Active Pipeline track */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-blue-500/20" />
              
              {/* Floating Data Packet */}
              <motion.div
                initial={{ left: "0%" }}
                animate={{ left: "100%" }}
                transition={{
                  duration: pipe.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: pipe.delay
                }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_12px_#818cf8] border border-white/50"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// STATE 3: Data Warehousing (SVG Donut Chart)
// ----------------------------------------------------
function DataWarehousingVisualizer() {
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const percentage = 78; // Used space representation
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full h-full flex flex-col justify-between"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-purple-400 flex items-center gap-1.5">
          <Layers className="h-3 w-3" /> Storage Index Capacity
        </span>
        <span className="text-[10px] text-slate-500 font-mono">Hot Disk Allocation</span>
      </div>

      <div className="flex-1 grid grid-cols-2 items-center gap-4">
        {/* Left: Animated Circle Chart */}
        <div className="flex justify-center items-center relative h-36">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background Circle */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-slate-900"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Foreground Circle */}
            <motion.circle
              cx="60"
              cy="60"
              r={radius}
              className="stroke-purple-500"
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0 0 6px rgba(168, 85, 247, 0.4))"
              }}
            />
          </svg>
          
          {/* Inner Text display */}
          <div className="absolute flex flex-col justify-center items-center text-center">
            <span className="text-xl font-bold text-white font-mono">{percentage}%</span>
            <span className="text-[8px] text-slate-400 font-medium uppercase tracking-wider">Used</span>
          </div>
        </div>

        {/* Right: Storage Stats Info */}
        <div className="flex flex-col space-y-3 justify-center">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-900">
            <div className="text-[10px] text-slate-500 font-medium">TOTAL SPACE</div>
            <div className="text-sm font-bold text-white font-mono">1.24 Petabytes</div>
          </div>
          
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-900">
            <div className="text-[10px] text-slate-500 font-medium">REDUNDANCY</div>
            <div className="text-sm font-bold text-emerald-400 font-mono flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> Triple Replicated
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// STATE 4: Cloud Platform (Floating Node Grid)
// ----------------------------------------------------
function CloudPlatformVisualizer() {
  const nodes = [
    { id: "us-east-1", x: "25%", y: "20%", label: "US-East" },
    { id: "eu-west-1", x: "75%", y: "30%", label: "EU-West" },
    { id: "ap-south-1", x: "35%", y: "70%", label: "AP-South" },
    { id: "sa-east-1", x: "70%", y: "75%", label: "SA-East" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col justify-between"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
          <Server className="h-3 w-3" /> Orchestration Nodes
        </span>
        <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
          Cluster Healthy
        </span>
      </div>

      <div className="flex-1 relative w-full h-40">
        {/* SVG linking paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Path connections */}
          <line x1="25%" y1="20%" x2="75%" y2="30%" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="25%" y1="20%" x2="35%" y2="70%" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="75%" y1="30%" x2="70%" y2="75%" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="35%" y1="70%" x2="70%" y2="75%" stroke="#1e293b" strokeWidth="1.5" />
          <line x1="25%" y1="20%" x2="70%" y2="75%" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 3" />
        </svg>

        {/* Dynamic pulsing squares */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            style={{ left: node.x, top: node.y }}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 4px rgba(6, 182, 212, 0.2)",
                "0 0 16px rgba(6, 182, 212, 0.5)",
                "0 0 4px rgba(6, 182, 212, 0.2)"
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-lg bg-slate-900 border border-cyan-500/40 flex flex-col items-center justify-center min-w-[70px]"
          >
            <Cpu className="h-3 w-3 text-cyan-400 mb-0.5" />
            <span className="text-[8px] text-white font-semibold font-mono">{node.id}</span>
            <span className="text-[6px] text-slate-500 font-mono">99.9% uptime</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default HeroSection;
