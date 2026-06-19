"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Database, 
  Server, 
  TrendingUp, 
  Cpu, 
  CheckCircle2, 
  Layers, 
  FileSpreadsheet, 
  RefreshCw, 
  BarChart3, 
  ArrowUpRight, 
  Zap,
  Activity,
  Menu,
  X,
  Play,
  Pause
} from "lucide-react";
import { gsap } from "gsap";

// ----------------------------------------------------
// TYPES & CONFIG
// ----------------------------------------------------
interface StageConfig {
  id: number;
  name: string;
  tag: string;
  description: string;
  color: string;
}

const STAGES: StageConfig[] = [
  {
    id: 1,
    name: "CSV Ingestion",
    tag: "CSV",
    description: "Harvest raw, unorganized business data from multiple disparate sources in real-time.",
    color: "#3b82f6", // Blue
  },
  {
    id: 2,
    name: "ETL Processing",
    tag: "ETL",
    description: "Extract, clean, structure, and sanitize raw records into operational schemas.",
    color: "#6366f1", // Indigo
  },
  {
    id: 3,
    name: "Data Warehouse",
    tag: "DWH",
    description: "Load structured records into high-performance cloud data warehouses for querying.",
    color: "#8b5cf6", // Purple
  },
  {
    id: 4,
    name: "Machine Learning",
    tag: "AI/ML",
    description: "Train intelligence models, run anomaly detection, and perform predictive scoring.",
    color: "#d946ef", // Magenta
  },
  {
    id: 5,
    name: "BI Dashboard",
    tag: "BI",
    description: "Visualize patterns and query speeds inside interactive analytics dashboards.",
    color: "#06b6d4", // Cyan
  },
  {
    id: 6,
    name: "Business Growth",
    tag: "ROI",
    description: "Translate intelligence into automated campaigns, pricing models, and core growth.",
    color: "#10b981", // Emerald
  },
];

// Number ticker helper
const NumberTicker = ({ value, duration = 1.5, suffix = "" }: { value: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = 30;
    const totalSteps = Math.round(totalMiliseconds / incrementTime);
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const current = Math.round(easeProgress * end);
      
      setCount(current);

      if (step >= totalSteps) {
        clearInterval(timer);
        setCount(end);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}{suffix}</span>;
};

// ----------------------------------------------------
// INTERACTIVE CANVAS PARTICLES
// ----------------------------------------------------
const CanvasParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }> = [];

    const initParticles = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 40 : 90;
      const colors = ["#3b82f6", "#6366f1", "#8b5cf6", "#06b6d4"];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particle network connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Particle movement
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Boundary bounce
        if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;

        // Interaction with mouse cursor
        if (mouseRef.current.x !== -1000) {
          const dx = mouseRef.current.x - p1.x;
          const dy = mouseRef.current.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < mouseRef.current.radius) {
            // Attract/pull slightly towards mouse
            const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
            p1.x += (dx / dist) * force * 0.8;
            p1.y += (dy / dist) * force * 0.8;
          }
        }

        // Render particles
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha;
        ctx.fill();

        // Draw links between nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = (100 - dist) / 100 * 0.12;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (canvas) {
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-50 z-0"
    />
  );
};

// ----------------------------------------------------
// STAGE ANIMATION CONTENTS
// ----------------------------------------------------

// STAGE 1: CSV FILE
const CSVStage = React.memo(() => {
  const [rows, setRows] = useState([
    ["USR_094", "48.29", "SUCCESS", "18:14:27"],
    ["USR_112", "190.11", "SUCCESS", "18:14:28"],
    ["USR_540", "34.02", "PENDING", "18:14:29"],
    ["USR_902", "551.49", "SUCCESS", "18:14:30"],
    ["USR_023", "90.22", "FAILED", "18:14:31"],
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRows(prev => prev.map(row => {
        if (Math.random() > 0.6) {
          const randomVal = (Math.random() * 500).toFixed(2);
          const statuses = ["SUCCESS", "PENDING", "FAILED"];
          const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
          return [row[0], randomVal, randomStatus, new Date().toLocaleTimeString()];
        }
        return row;
      }));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* CSV Document Card */}
      <div className="flex-1 flex flex-col justify-center items-center z-10">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[320px] bg-slate-950/75 border border-blue-500/25 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl"
        >
          {/* File Header */}
          <div className="px-3.5 py-2.5 bg-blue-950/40 border-b border-blue-500/20 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-blue-400" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-blue-200">raw_events.csv</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[9px] font-mono text-blue-400 font-bold uppercase">Streaming</span>
            </div>
          </div>

          {/* CSV File rows */}
          <div className="p-3 font-mono text-[9px] leading-relaxed text-slate-300 divide-y divide-slate-900/60 max-h-[160px] overflow-hidden">
            {rows.map((row, idx) => (
              <div key={idx} className="grid grid-cols-4 py-1.5 hover:bg-blue-950/20 px-1 transition-colors">
                <span className="text-slate-400 font-semibold">{row[0]}</span>
                <span className="text-right text-blue-300 pr-2">${row[1]}</span>
                <span className={`text-center font-bold px-1.5 py-0.5 rounded-sm ${
                  row[2] === "SUCCESS" ? "text-emerald-400 bg-emerald-950/20" :
                  row[2] === "PENDING" ? "text-amber-400 bg-amber-950/20" : "text-rose-400 bg-rose-950/20"
                }`}>{row[2]}</span>
                <span className="text-right text-slate-400 text-[8px]">{row[3]}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Particles emerging from the file */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-none w-full max-w-[280px]">
        {[1, 2, 3].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0, scale: 0.5 }}
            animate={{ y: -150, opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut"
            }}
            className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6] mx-auto"
          />
        ))}
      </div>

      <div className="text-[10px] text-slate-400 font-mono text-center mt-2 border-t border-slate-950 pt-2 flex justify-between">
        <span>INCOMING: 2,492 / SEC</span>
        <span>PARSING RAW CSV</span>
      </div>
    </div>
  );
});

// STAGE 2: ETL PROCESSING
const ETLStage = React.memo(() => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="flex-1 flex flex-col justify-center items-center z-10 px-4 w-full">
        {/* Glassmorphism Processing Card */}
        <div className="w-full max-w-[340px] bg-slate-950/75 border border-indigo-500/20 rounded-2xl p-5 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">ETL Processor Engine</span>
            <RefreshCw className="h-3.5 w-3.5 text-indigo-400 animate-spin" style={{ animationDuration: "6s" }} />
          </div>

          {/* Engine Visualizer Schema */}
          <div className="flex justify-between items-center relative py-4">
            {/* Raw Block */}
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-indigo-950/30 border border-indigo-800/30 w-16">
              <span className="text-[8px] font-mono text-indigo-400 uppercase font-semibold">RAW</span>
              <div className="flex flex-col gap-1 mt-1.5 w-full">
                <div className="h-1 bg-indigo-500/30 rounded w-full" />
                <div className="h-1 bg-indigo-500/30 rounded w-2/3" />
                <div className="h-1 bg-indigo-500/30 rounded w-3/4" />
              </div>
            </div>

            {/* Tube Connection Left */}
            <div className="flex-1 h-0.5 bg-indigo-800/20 relative mx-1">
              <motion.div 
                initial={{ left: "0%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#6366f1]"
              />
            </div>

            {/* Rotating Core Loading Rings */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-indigo-500/10 border-t-indigo-400 rounded-full animate-spin" style={{ animationDuration: "1.5s" }} />
              <div className="absolute inset-2 border border-dashed border-indigo-500/30 rounded-full animate-spin" style={{ animationDuration: "4s", animationDirection: "reverse" }} />
              <Cpu className="h-5 w-5 text-indigo-400" />
            </div>

            {/* Tube Connection Right */}
            <div className="flex-1 h-0.5 bg-indigo-800/20 relative mx-1">
              <motion.div 
                initial={{ left: "0%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.9 }}
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_#6366f1]"
              />
            </div>

            {/* Structured Block */}
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-emerald-950/20 border border-emerald-800/30 w-16">
              <span className="text-[8px] font-mono text-emerald-400 uppercase font-semibold">CLEAN</span>
              <div className="flex flex-col gap-1 mt-1.5 w-full">
                <div className="h-1 bg-emerald-500/60 rounded w-full" />
                <div className="h-1 bg-emerald-500/60 rounded w-full" />
                <div className="h-1 bg-emerald-500/60 rounded w-full" />
              </div>
            </div>
          </div>

          {/* Status logs */}
          <div className="mt-3 bg-slate-950/90 border border-slate-900 rounded p-2.5 font-mono text-[8px] text-slate-400 space-y-1.5">
            <div className="flex justify-between">
              <span>CLEANSING: NULL REMOVAL</span>
              <span className="text-emerald-400 font-bold">100%</span>
            </div>
            <div className="flex justify-between">
              <span>TYPECASTING & PARSING</span>
              <span className="text-indigo-400 font-bold">RUNNING</span>
            </div>
            <div className="flex justify-between">
              <span>SCHEMA VALIDATION</span>
              <span className="text-indigo-400 font-bold">STABLE</span>
            </div>
          </div>

        </div>
      </div>

      <div className="text-[10px] text-slate-400 font-mono text-center mt-2 border-t border-slate-950 pt-2 flex justify-between">
        <span>THROUGHPUT: 42.8K rec/s</span>
        <span>LATENCY: 1.2ms</span>
      </div>
    </div>
  );
});

// STAGE 3: DATA WAREHOUSE
const WarehouseStage = React.memo(() => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-purple-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="flex-1 flex flex-col justify-center items-center z-10 px-4 w-full">
        <div className="w-full max-w-[340px] bg-slate-950/75 border border-purple-500/20 rounded-2xl p-5 shadow-2xl backdrop-blur-xl relative">
          
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">Cloud Data Warehouse</span>
            <Server className="h-3.5 w-3.5 text-purple-400" />
          </div>

          {/* Database Cylinders Schema */}
          <div className="grid grid-cols-3 gap-3.5 py-4">
            {[
              { id: "Node-A", val: 85, status: "HOT" },
              { id: "Node-B", val: 92, status: "HOT" },
              { id: "Node-C", val: 64, status: "WARM" },
            ].map((node, i) => (
              <div key={i} className="flex flex-col items-center p-2 bg-slate-950/50 border border-slate-800/80 rounded-xl">
                {/* Cylinder Graphics */}
                <div className="relative w-8 h-12 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col justify-end">
                  {/* Energy Filler */}
                  <motion.div
                    initial={{ height: "0%" }}
                    animate={{ height: `${node.val}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-full bg-gradient-to-t from-purple-800 via-purple-500 to-indigo-400 opacity-80"
                  />
                  <div className="absolute top-1 left-0 right-0 h-1 border-b border-slate-800/40" />
                  <div className="absolute top-3 left-0 right-0 h-1 border-b border-slate-800/40" />
                  <div className="absolute top-5 left-0 right-0 h-1 border-b border-slate-800/40" />
                </div>

                <span className="text-[8px] font-mono text-slate-400 font-bold mt-2">{node.id}</span>
                <span className="text-[7px] font-mono text-purple-400 font-bold">{node.val}% Capacity</span>
                <span className={`text-[6px] font-mono font-bold mt-1 px-1 rounded-sm ${
                  node.status === "HOT" ? "text-rose-400 bg-rose-950/30" : "text-amber-400 bg-amber-950/30"
                }`}>{node.status}</span>
              </div>
            ))}
          </div>

          {/* Connection Lines & Light pulse */}
          <div className="absolute -bottom-1 left-12 right-12 h-6 overflow-hidden pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 200 24">
              <path d="M10,24 L10,12 L190,12 L190,24" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
              <motion.circle
                cx="10"
                cy="12"
                r="3"
                fill="#a78bfa"
                style={{ filter: "drop-shadow(0 0 4px #8b5cf6)" }}
                animate={{
                  cx: [10, 100, 190],
                  cy: [12, 12, 12]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </svg>
          </div>

          <div className="mt-2 p-2 bg-purple-950/10 border border-purple-900/20 rounded font-mono text-[8px] text-purple-200 text-center">
            INDEXED PARTITIONS: 1,920 UPTIME: 99.999%
          </div>

        </div>
      </div>

      <div className="text-[10px] text-slate-400 font-mono text-center mt-2 border-t border-slate-950 pt-2 flex justify-between">
        <span>WAREHOUSE TOTAL: 1.48 PB</span>
        <span>INDEX TYPE: COLUMMAR</span>
      </div>
    </div>
  );
});

// STAGE 4: MACHINE LEARNING
const MLStage = React.memo(() => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-magenta-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="flex-1 flex flex-col justify-center items-center z-10 px-2 w-full">
        <div className="w-full max-w-[340px] bg-slate-950/75 border border-magenta-500/20 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-mono text-magenta-400 font-bold uppercase tracking-wider">Predictive AI Brain</span>
            <Cpu className="h-3.5 w-3.5 text-magenta-400 animate-pulse" />
          </div>

          {/* Neural Network SVG and Chart */}
          <div className="grid grid-cols-5 items-center gap-2 py-2">
            
            {/* Neural Net Layer */}
            <div className="col-span-3 h-28 relative">
              <svg className="w-full h-full" viewBox="0 0 120 80">
                {/* Connections */}
                {/* Input to Hidden */}
                <line x1="15" y1="20" x2="60" y2="15" stroke="#f472b6" strokeWidth="0.5" opacity="0.3" />
                <line x1="15" y1="20" x2="60" y2="30" stroke="#f472b6" strokeWidth="0.5" opacity="0.3" />
                <line x1="15" y1="40" x2="60" y2="15" stroke="#f472b6" strokeWidth="0.5" opacity="0.3" />
                <line x1="15" y1="40" x2="60" y2="45" stroke="#f472b6" strokeWidth="0.5" opacity="0.3" />
                <line x1="15" y1="60" x2="60" y2="45" stroke="#f472b6" strokeWidth="0.5" opacity="0.3" />
                <line x1="15" y1="60" x2="60" y2="65" stroke="#f472b6" strokeWidth="0.5" opacity="0.3" />

                {/* Hidden to Output */}
                <line x1="60" y1="15" x2="105" y2="30" stroke="#d946ef" strokeWidth="0.5" opacity="0.3" />
                <line x1="60" y1="30" x2="105" y2="30" stroke="#d946ef" strokeWidth="0.5" opacity="0.3" />
                <line x1="60" y1="45" x2="105" y2="50" stroke="#d946ef" strokeWidth="0.5" opacity="0.3" />
                <line x1="60" y1="65" x2="105" y2="50" stroke="#d946ef" strokeWidth="0.5" opacity="0.3" />

                {/* Pulsing signal pulses */}
                <motion.circle cx="15" cy="20" r="1.5" fill="#f472b6" animate={{ cx: [15, 60, 105], cy: [20, 15, 30] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                <motion.circle cx="15" cy="40" r="1.5" fill="#f472b6" animate={{ cx: [15, 60, 105], cy: [40, 45, 50] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.6 }} />
                <motion.circle cx="15" cy="60" r="1.5" fill="#f472b6" animate={{ cx: [15, 60, 105], cy: [60, 65, 50] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.2 }} />

                {/* Nodes */}
                {/* Input nodes */}
                <circle cx="15" cy="20" r="4.5" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.5" />
                <circle cx="15" cy="40" r="4.5" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.5" />
                <circle cx="15" cy="60" r="4.5" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.5" />

                {/* Hidden Nodes */}
                <circle cx="60" cy="15" r="4.5" fill="#6366f1" stroke="#312e81" strokeWidth="1.5" />
                <circle cx="60" cy="30" r="4.5" fill="#6366f1" stroke="#312e81" strokeWidth="1.5" />
                <circle cx="60" cy="45" r="4.5" fill="#6366f1" stroke="#312e81" strokeWidth="1.5" />
                <circle cx="60" cy="65" r="4.5" fill="#6366f1" stroke="#312e81" strokeWidth="1.5" />

                {/* Output nodes */}
                <circle cx="105" cy="30" r="4.5" fill="#d946ef" stroke="#701a75" strokeWidth="1.5" />
                <circle cx="105" cy="50" r="4.5" fill="#d946ef" stroke="#701a75" strokeWidth="1.5" />
              </svg>
            </div>

            {/* AI Performance Statistics */}
            <div className="col-span-2 flex flex-col gap-1.5 justify-center">
              <div className="p-1.5 bg-slate-900 border border-slate-800 rounded">
                <div className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">Accuracy</div>
                <div className="text-xs font-mono font-bold text-magenta-400">
                  <NumberTicker value={96} suffix="%" />
                </div>
              </div>
              <div className="p-1.5 bg-slate-900 border border-slate-800 rounded">
                <div className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">Confidence</div>
                <div className="text-xs font-mono font-bold text-magenta-400">
                  <NumberTicker value={98} suffix="%" />
                </div>
              </div>
              <div className="p-1.5 bg-slate-900 border border-slate-800 rounded">
                <div className="text-[6.5px] text-slate-400 font-bold uppercase tracking-wider">Coverage</div>
                <div className="text-xs font-mono font-bold text-magenta-400">
                  <NumberTicker value={99} suffix="%" />
                </div>
              </div>
            </div>

          </div>

          {/* Sparkline chart */}
          <div className="mt-2 h-6 w-full flex items-end">
            <svg className="w-full h-full" viewBox="0 0 200 30" preserveAspectRatio="none">
              <path
                d="M0,25 Q20,10 40,28 T80,12 T120,20 T160,5 T200,18"
                fill="none"
                stroke="#d946ef"
                strokeWidth="1.5"
                opacity="0.85"
              />
              <path
                d="M0,25 Q20,10 40,28 T80,12 T120,20 T160,5 T200,18 L200,30 L0,30 Z"
                fill="url(#mlGlowGrad)"
                opacity="0.1"
              />
              <defs>
                <linearGradient id="mlGlowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d946ef" />
                  <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

        </div>
      </div>

      <div className="text-[10px] text-slate-400 font-mono text-center mt-2 border-t border-slate-950 pt-2 flex justify-between">
        <span>MODEL: XGBOOST-V8.4</span>
        <span>DEVICE: CUDA NVIDIA A100</span>
      </div>
    </div>
  );
});

// STAGE 5: ANALYTICS DASHBOARD
const DashboardStage = React.memo(() => {
  const [revenue, setRevenue] = useState(1284902);
  const [customers, setCustomers] = useState(4829);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevenue(prev => prev + Math.floor(Math.random() * 25));
      setCustomers(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="flex-1 flex flex-col justify-center items-center z-10 px-2 w-full">
        {/* Glassmorphic Dashboard */}
        <div className="w-full max-w-[340px] bg-slate-950/75 border border-cyan-500/20 rounded-2xl p-4 shadow-2xl backdrop-blur-xl">
          
          <div className="flex justify-between items-center mb-3">
            <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Real-Time BI Analytics</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-[8px] font-mono text-cyan-400 font-semibold">Active</span>
            </span>
          </div>

          {/* KPI grid */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="p-2 bg-slate-950/50 border border-slate-900 rounded-lg">
              <span className="text-[7px] text-slate-400 font-bold uppercase block">MRR</span>
              <span className="text-[10px] font-mono font-bold text-white">${revenue.toLocaleString()}</span>
            </div>
            <div className="p-2 bg-slate-950/50 border border-slate-900 rounded-lg">
              <span className="text-[7px] text-slate-400 font-bold uppercase block">Clients</span>
              <span className="text-[10px] font-mono font-bold text-white">{customers.toLocaleString()}</span>
            </div>
            <div className="p-2 bg-slate-950/50 border border-slate-900 rounded-lg">
              <span className="text-[7px] text-slate-400 font-bold uppercase block">Query Speed</span>
              <span className="text-[10px] font-mono font-bold text-cyan-400">42ms</span>
            </div>
          </div>

          {/* Charts area */}
          <div className="grid grid-cols-2 gap-3 items-center">
            
            {/* Mini bar chart */}
            <div className="bg-slate-950/50 border border-slate-900 rounded-lg p-2.5 h-20 flex flex-col justify-between">
              <span className="text-[7px] text-slate-400 font-bold uppercase block">Weekly Traffic</span>
              <div className="flex items-end justify-between h-12 gap-1 px-1">
                {[40, 75, 45, 90, 60].map((h, idx) => (
                  <div key={idx} className="flex-1 bg-slate-900 rounded-t-sm h-full flex items-end">
                    <motion.div
                      initial={{ height: "0%" }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1.2, delay: idx * 0.1 }}
                      className="w-full bg-cyan-500 rounded-t-sm opacity-80"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mini Donut Chart */}
            <div className="bg-slate-950/50 border border-slate-900 rounded-lg p-2.5 h-20 flex items-center justify-between">
              <div className="flex flex-col justify-center">
                <span className="text-[7px] text-slate-400 font-bold uppercase block">Demographics</span>
                <span className="text-[9px] font-mono font-bold text-white mt-1">Enterprise: 68%</span>
                <span className="text-[7px] font-mono text-slate-400">SME: 32%</span>
              </div>
              
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="12" fill="none" stroke="#17181c" strokeWidth="4" />
                  <circle cx="16" cy="16" r="12" fill="none" stroke="#06b6d4" strokeWidth="4" strokeDasharray="50 100" strokeDashoffset="0" />
                  <circle cx="16" cy="16" r="12" fill="none" stroke="#6366f1" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-50" />
                </svg>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div className="text-[10px] text-slate-400 font-mono text-center mt-2 border-t border-slate-950 pt-2 flex justify-between">
        <span>REFRESH RATE: 0.5s</span>
        <span>TYPE: INTERACTIVE</span>
      </div>
    </div>
  );
});

// STAGE 6: BUSINESS GROWTH
const GrowthStage = React.memo(() => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="flex-1 flex flex-col justify-center items-center z-10 px-2 w-full">
        {/* Glassmorphic Growth Card */}
        <div className="w-full max-w-[340px] bg-slate-950/75 border border-emerald-500/20 rounded-2xl p-5 shadow-2xl backdrop-blur-xl text-center relative overflow-hidden">
          
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />

          {/* Success Check Icon */}
          <div className="w-12 h-12 rounded-full bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-400 animate-pulse" />
          </div>

          <h4 className="text-sm font-semibold text-white mb-3">Business Value Achieved</h4>

          {/* Growth Badges */}
          <div className="space-y-2">
            {[
              { label: "Revenue Growth", val: "+245%", desc: "automated pricing model ROI" },
              { label: "Customer Retention", val: "+180%", desc: "churn predictor engine value" },
              { label: "Data Pipeline Efficiency", val: "+320%", desc: "infra cost query reduction" },
            ].map((badge, idx) => (
              <div key={idx} className="flex justify-between items-center p-2 bg-emerald-950/10 border border-emerald-800/10 rounded-lg">
                <div className="text-left">
                  <div className="text-[9px] text-slate-400 font-bold uppercase leading-none">{badge.label}</div>
                  <div className="text-[7px] text-slate-400 font-mono mt-1">{badge.desc}</div>
                </div>
                <div className="text-right text-sm font-mono font-extrabold text-emerald-400">{badge.val}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-emerald-950 pt-3 flex flex-col items-center">
            <span className="text-[10px] font-mono text-emerald-400 font-bold">Insights Delivered.</span>
            <span className="text-[10px] font-mono text-white font-bold">Growth Achieved.</span>
          </div>

        </div>
      </div>

      <div className="text-[10px] text-slate-400 font-mono text-center mt-2 border-t border-slate-950 pt-2 flex justify-between">
        <span>ROI ATTRIBUTION: 100%</span>
        <span>PAYBACK PERIOD: &lt; 3 MOS</span>
      </div>
    </div>
  );
});

// ----------------------------------------------------
// MAIN HERO COMPONENT
// ----------------------------------------------------
export function DataLifecycleHero() {
  const [activeStage, setActiveStage] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Monitor Scroll Progress & Map to Stage
  useEffect(() => {
    const handleScroll = () => {
      const element = containerRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementHeight = element.offsetHeight;
      const viewHeight = window.innerHeight;

      // Calculate progress through the full height of container
      const totalScrollable = elementHeight - viewHeight;
      const scrolled = -rect.top;
      
      let progress = scrolled / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);

      // Map progress to active stage 1-6
      if (progress < 0.16) {
        setActiveStage(1);
      } else if (progress < 0.33) {
        setActiveStage(2);
      } else if (progress < 0.50) {
        setActiveStage(3);
      } else if (progress < 0.67) {
        setActiveStage(4);
      } else if (progress < 0.83) {
        setActiveStage(5);
      } else {
        setActiveStage(6);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-playing logic when NOT scrolling / on mobile
  useEffect(() => {
    if (!isAutoPlaying) return;

    // Only auto-play if scroll progress is near zero (meaning the user hasn't scrolled deep)
    if (scrollProgress > 0.05) return;

    const timer = setInterval(() => {
      setActiveStage(prev => (prev === 6 ? 1 : prev + 1));
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoPlaying, scrollProgress]);

  // Click handler to scroll to corresponding segment
  const handleStageClick = (stageId: number) => {
    setIsAutoPlaying(false);
    const element = containerRef.current;
    if (!element) return;

    const elementHeight = element.offsetHeight;
    const viewHeight = window.innerHeight;
    const totalScrollable = elementHeight - viewHeight;

    // Calculate Target Scroll position based on stage ID
    // 1 -> 0%, 2 -> 20%, 3 -> 40%, 4 -> 60%, 5 -> 80%, 6 -> 100%
    const targetProgress = (stageId - 1) / 5;
    const targetScrollTop = element.offsetTop + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetScrollTop + 10,
      behavior: "smooth",
    });

    setActiveStage(stageId);
  };

  // Mouse Reactive Spotlight Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty("--mouse-x", `${x}px`);
      spotlightRef.current.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  return (
    <div 
      id="lifecycle"
      ref={containerRef} 
      className="relative w-full h-[380vh] bg-[#000000] text-[#e7e9ea]"
    >
      {/* Sticky Hero Wrapper */}
      <div 
        ref={spotlightRef}
        onMouseMove={handleMouseMove}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between z-10 bg-[#000000]/95 spotlight-container"
        style={{
          position: "sticky",
          background: "radial-gradient(circle 800px at var(--mouse-x, 50%) var(--mouse-y, 30%), rgba(30, 58, 138, 0.12) 0%, #000000 100%)"
        }}
      >
        {/* Animated Background Layers */}
        <CanvasParticles />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none z-0" />
        
        {/* Subtle glowing fog */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] animate-pulse pointer-events-none z-0" style={{ animationDuration: "12s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[140px] animate-pulse pointer-events-none z-0" style={{ animationDuration: "8s" }} />
 
        {/* Laser scan line overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent shadow-[0_0_12px_rgba(59,130,246,0.3)]"
          />
        </div>
 
        {/* ----------------------------------------------------
            1. NAVIGATION HEADER
        ---------------------------------------------------- */}
        <header className="relative w-full z-40 px-6 md:px-12 py-6 border-b border-white/5 backdrop-blur-md bg-slate-950/20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 md:h-11 md:w-11 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-slate-950/80 shadow-[0_0_20px_rgba(59,130,246,0.25)]">
              <Image
                src="/Avismita_Technologies_Logo-removebg-preview (1).png"
                alt="Avismita Technologies Logo"
                width={44}
                height={44}
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
          </div>
 
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-10">
            {[
              { label: "LIFECYCLE", href: "#lifecycle" },
              { label: "SERVICES", href: "#what-we-do" },
              { label: "IMPACT", href: "#impact" },
              { label: "ABOUT", href: "#about" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-bold tracking-widest text-slate-400 hover:text-white transition-colors font-mono"
              >
                {item.label}
              </a>
            ))}
          </nav>
 
          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="#contact" 
              className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-xs font-bold tracking-widest transition-all shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)]"
            >
              BOOK DEMO
            </a>
          </div>
 
          {/* Mobile Hamburger */}
          <button aria-label="Toggle Navigation Menu"
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
              className="fixed inset-0 bg-[#000000]/98 backdrop-blur-lg z-30 flex flex-col justify-center items-center space-y-8"
            >
              {[
                { label: "LIFECYCLE", href: "#lifecycle" },
                { label: "SERVICES", href: "#what-we-do" },
                { label: "IMPACT", href: "#impact" },
                { label: "ABOUT", href: "#about" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl font-bold tracking-widest text-white hover:text-blue-400 transition-colors font-mono"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-8 py-3 bg-blue-600 text-white font-bold tracking-widest rounded-full hover:bg-blue-500 transition-all text-sm inline-block shadow-lg"
              >
                BOOK DEMO
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ----------------------------------------------------
            2. MAIN COLUMNS LAYOUT
        ---------------------------------------------------- */}
        <main className="relative flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center z-10">
          
          {/* Left Column (Headline & Stepper) */}
          <div className="lg:col-span-6 flex flex-col justify-center items-start text-left space-y-6">
            
            {/* Live indicator & Stepper */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/25 bg-blue-500/10 text-[10px] font-bold tracking-wider text-blue-400 font-mono">
                <Activity className="h-3 w-3 animate-pulse" />
                ENTERPRISE SYSTEM
              </span>
              {scrollProgress <= 0.05 && (
                <button aria-label="Toggle Animation Playback"
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="flex items-center gap-1 text-[9px] font-mono text-slate-400 hover:text-slate-300"
                >
                  {isAutoPlaying ? <Pause className="h-2.5 w-2.5" /> : <Play className="h-2.5 w-2.5" />}
                  {isAutoPlaying ? "AUTO ON" : "PAUSED"}
                </button>
              )}
            </div>

            {/* Giant Premium Headline */}
            <h1 className="text-[36px] sm:text-[46px] md:text-[54px] lg:text-[62px] font-extrabold uppercase tracking-tight leading-[1.05] text-white font-sans max-w-xl">
              Transform Raw Data Into <br className="hidden md:inline" />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                Actionable Intelligence
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-[13px] md:text-[15px] text-slate-400 leading-relaxed max-w-[500px]">
              We collect, process, analyze, and transform complex business data into insights that drive measurable growth. Experience the complete intelligence loop in action.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
              <a 
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
              >
                <span>Get Started</span>
                <ArrowRight size={13} className="stroke-[2.5]" />
              </a>
              <button 
                onClick={() => handleStageClick(5)}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-950/40 hover:bg-slate-900/40 text-slate-300 hover:text-white rounded-full font-bold uppercase tracking-widest text-xs border border-white/10 hover:border-white/20 transition-all backdrop-blur"
              >
                <span>Book Demo</span>
              </button>
            </div>

            {/* Stepper Progress Bar (Enterprise SaaS Credibility) */}
            <div className="hidden md:flex flex-col gap-2 pt-4 w-full max-w-[420px]">
              <div className="text-[9px] font-mono font-bold tracking-wider text-slate-400 uppercase">Data Lifecycle Pipeline</div>
              <div className="grid grid-cols-6 gap-2">
                {STAGES.map((stage) => {
                  const isActive = activeStage === stage.id;
                  const isCompleted = activeStage > stage.id;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => handleStageClick(stage.id)}
                      className="flex flex-col items-start text-left cursor-pointer group"
                    >
                      {/* Bar indicator */}
                      <div className="w-full h-[3px] bg-slate-900 rounded-full overflow-hidden mb-1 relative">
                        {isCompleted && (
                          <div className="absolute inset-0 bg-blue-500" />
                        )}
                        {isActive && (
                          <motion.div 
                            layoutId="activeBarLoader"
                            className="absolute inset-0 bg-blue-400"
                            style={{ filter: "drop-shadow(0 0 4px #3b82f6)" }}
                          />
                        )}
                      </div>
                      {/* Label details */}
                      <span className={`text-[8px] font-mono font-bold ${
                        isActive ? "text-white" : "text-slate-400 group-hover:text-slate-400"
                      }`}>{stage.tag}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column (Dynamic Visualizer Card) */}
          <div className="lg:col-span-6 w-full flex justify-center relative">
            
            {/* Visualizer Frame */}
            <div className="w-full max-w-[420px] aspect-[4/3.8] md:aspect-square bg-slate-950/35 border border-white/10 rounded-2xl p-5 flex flex-col justify-between overflow-hidden relative shadow-[0_0_80px_rgba(30,58,138,0.2)] backdrop-blur-xl">
              
              {/* Top Bar System Telemetry */}
              <div className="flex justify-between items-center pb-2 border-b border-white/5 font-mono text-[8.5px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                  <span>STATUS: PIPELINE_ONLINE</span>
                </div>
                <span>NODE_ID: AVISMITA_AI_CORE</span>
                <span>STEP: 0{activeStage} / 06</span>
              </div>

              {/* Stage Container */}
              <div className="flex-1 w-full py-4 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage}
                    initial={{ opacity: 0, scale: 0.96, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -8 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="w-full h-full"
                  >
                    {activeStage === 1 && <CSVStage />}
                    {activeStage === 2 && <ETLStage />}
                    {activeStage === 3 && <WarehouseStage />}
                    {activeStage === 4 && <MLStage />}
                    {activeStage === 5 && <DashboardStage />}
                    {activeStage === 6 && <GrowthStage />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Step Title & Description inside card */}
              <div className="pt-3 border-t border-white/5 flex flex-col gap-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white tracking-wide">
                    {STAGES[activeStage - 1].name}
                  </span>
                  <span 
                    className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border"
                    style={{
                      borderColor: `${STAGES[activeStage - 1].color}35`,
                      backgroundColor: `${STAGES[activeStage - 1].color}12`,
                      color: STAGES[activeStage - 1].color
                    }}
                  >
                    {STAGES[activeStage - 1].tag}
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-400 leading-normal">
                  {STAGES[activeStage - 1].description}
                </p>
              </div>

            </div>

            {/* Glowing circular backdrop behind the card */}
            <div 
              className="absolute inset-0 -z-10 rounded-full blur-[100px] opacity-30 transition-all duration-700 pointer-events-none"
              style={{
                backgroundColor: STAGES[activeStage - 1].color,
                transform: "scale(0.8)",
              }}
            />

          </div>

        </main>

        {/* ----------------------------------------------------
            3. FOOTER TRUST INDICATORS
        ---------------------------------------------------- */}
        <footer className="relative w-full z-20 px-6 md:px-12 py-8 border-t border-white/5 bg-slate-950/30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Quick explanation tag */}
            <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest text-center md:text-left">
              Scroll down to explore <br className="hidden md:inline" /> platform architecture
            </div>

            {/* Trust Metrics indicators */}
            <div className="grid grid-cols-2 md:flex md:space-x-12 gap-6 w-full md:w-auto text-center md:text-left justify-around">
              {[
                { label: "50+ Deployments", desc: "enterprise systems built" },
                { label: "99.9% Uptime", desc: "pipeline data reliability" },
                { label: "End-to-End AI", desc: "custom predictive models" },
                { label: "Sub-Second Queries", desc: "real-time analytics speed" },
              ].map((metric, idx) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.15, duration: 0.5 }}
                  className="flex flex-col"
                >
                  <span className="text-sm md:text-base font-extrabold text-white font-mono">{metric.label}</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{metric.desc}</span>
                </motion.div>
              ))}
            </div>

          </div>
        </footer>

      </div>
    </div>
  );
}

export default DataLifecycleHero;
