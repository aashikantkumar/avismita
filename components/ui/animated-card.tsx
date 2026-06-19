import * as React from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  Layers,
  TrendingUp,
  Server,
  Cpu,
  Network,
  CheckCircle,
  Smartphone,
  ShoppingCart,
  Cog,
  Activity,
  Shield,
  ArrowRight,
  AlertTriangle,
  Filter,
  Globe,
  Users,
  Cloud
} from "lucide-react";

// --- Utility Function (from @/lib/utils) ---

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Hover Context ---
export const HoverContext = React.createContext<boolean>(false);

// --- Card Components ---

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AnimatedCard({ className, ...props }: CardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <HoverContext.Provider value={isHovered}>
      <div
        role="region"
        aria-labelledby="card-title"
        aria-describedby="card-description"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "group/animated-card relative w-[356px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm",
          className
        )}
        {...props}
      />
    </HoverContext.Provider>
  );
}

export function CardBody({ className, ...props }: CardProps) {
  return (
    <div
      role="group"
      className={cn(
        "flex flex-col space-y-1.5 border-t border-slate-200 p-4",
        className
      )}
      {...props}
    />
  );
}

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-slate-900",
        className
      )}
      {...props}
    />
  );
}

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <p
      className={cn(
        "text-sm text-slate-400",
        className
      )}
      {...props}
    />
  );
}

export function CardVisual({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("h-[180px] w-[356px] overflow-hidden", className)}
      {...props}
    />
  );
}

// --- Shared Unified Diagram UI Components ---

const DiagramPath = ({ startX, endX, active, activeColor, dashed = true }: { startX: number, endX: number, active: boolean, activeColor: string, dashed?: boolean }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
    {/* Background faint line */}
    <path d={`M ${startX} 90 L ${endX} 90`} stroke="#e2e8f0" strokeWidth="2" strokeDasharray={dashed ? "4 4" : "none"} />
    
    {/* Active bright animated line */}
    {active && (
      <motion.path
        d={`M ${startX} 90 L ${endX} 90`}
        stroke={activeColor}
        strokeWidth="2"
        strokeDasharray={dashed ? "4 4" : "none"}
        initial={{ strokeDashoffset: 12 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
      />
    )}
    
    {/* Subtle idle animated line when not active */}
    {!active && (
       <motion.path
        d={`M ${startX} 90 L ${endX} 90`}
        stroke="#cbd5e1"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ strokeDashoffset: 12 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    )}
  </svg>
)

const Label = ({ text, color, visible }: { text: string, color: string, visible: boolean }) => (
  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={text}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="px-4 py-1.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md shadow-sm"
        >
          <span className="text-[10px] font-medium tracking-widest uppercase font-mono" style={{ color }}>
            {text}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const Tracker = ({ step, total = 5, color }: { step: number, total?: number, color: string }) => {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
      {Array.from({ length: total }).map((_, i) => {
        const s = i + 1;
        const isActive = s === step;
        const isPast = s < step;
        return (
          <div key={s} className="h-1 rounded-full transition-all duration-500 overflow-hidden bg-slate-200" style={{ width: isActive ? 24 : 8 }}>
            {(isActive || isPast) && (
              <motion.div 
                className="h-full w-full"
                style={{ backgroundColor: color }}
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// --- Visual Components ---

interface Visual1Props {
  mainColor?: string;
  secondaryColor?: string;
  gridColor?: string;
}

export function Visual1({
  mainColor = "#8b5cf6",
  secondaryColor = "#fbbf24",
  gridColor = "#80808015",
}: Visual1Props) {
  // Provided for backwards compatibility with demo.tsx
  return (
    <div aria-hidden className="relative h-full w-full overflow-hidden rounded-t-lg bg-slate-50">
      <EllipseGradient color={mainColor} />
      <GridLayer color={gridColor} />
    </div>
  );
}

interface VisualProps {
  mainColor?: string;
  secondaryColor?: string;
  gridColor?: string;
  step?: number;
}

// 1. Data Engineering Visualizer (Unified Diagram)
export function VisualDataEngineering({
  mainColor = "#3b82f6",
  gridColor = "#80808015",
  step: controlledStep,
}: VisualProps) {
  const isHovered = React.useContext(HoverContext);
  const [internalStep, setInternalStep] = React.useState(0);
  
  const step = controlledStep !== undefined ? controlledStep : internalStep;

  React.useEffect(() => {
    if (controlledStep !== undefined) return;
    if (!isHovered) {
      setInternalStep(0);
      return;
    }
    setInternalStep(1);
    const interval = setInterval(() => {
      setInternalStep((prev) => (prev < 5 ? prev + 1 : 1));
    }, 2000); // Faster, smoother transitions
    return () => clearInterval(interval);
  }, [isHovered, controlledStep]);

  const labels = [
    "Continuous Data Flow", 
    "1. Fragmented Sources", 
    "2. ADF Ingestion", 
    "3. Spark Processing", 
    "4. Delta Storage", 
    "5. Insights Delivery"
  ];

  return (
    <div className="relative h-full w-full bg-slate-50 overflow-hidden select-none">
      <GridLayer color={gridColor} />
      <EllipseGradient color={mainColor} />
      
      <Label text={labels[step]} color={step === 0 ? "#a1a1aa" : mainColor} visible={true} />
      <Tracker step={step} color={mainColor} />

      {/* Structural Pipeline Paths */}
      <DiagramPath startX={56} endX={114} active={step >= 2} activeColor="#3b82f6" />
      <DiagramPath startX={146} endX={204} active={step >= 4} activeColor="#06b6d4" />
      <DiagramPath startX={236} endX={294} active={step >= 5} activeColor="#10b981" />

      {/* Node 1: Sources */}
      <div className="absolute top-[90px] left-[40px] -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-10">
        <motion.div animate={step === 1 ? { x: [-1, 1, -1] } : {}} transition={{ repeat: Infinity, duration: 0.2 }} className={`w-8 h-8 rounded-lg bg-white border ${step === 1 ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-slate-200'} flex items-center justify-center transition-colors duration-500`}>
          <Database className={`w-4 h-4 ${step === 1 ? 'text-red-400' : 'text-slate-400'} transition-colors duration-500`} />
        </motion.div>
        <motion.div animate={step === 1 ? { x: [1, -1, 1] } : {}} transition={{ repeat: Infinity, duration: 0.2 }} className={`w-8 h-8 rounded-lg bg-white border ${step === 1 ? 'border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' : 'border-slate-200'} flex items-center justify-center transition-colors duration-500`}>
          <Smartphone className={`w-4 h-4 ${step === 1 ? 'text-red-400' : 'text-slate-400'} transition-colors duration-500`} />
        </motion.div>
      </div>

      {/* Node 2: Databricks Core */}
      <div className="absolute top-[90px] left-[130px] -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div 
          animate={step === 3 ? { rotate: 180, scale: 1.1 } : { rotate: 0, scale: 1 }} 
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`w-12 h-12 rounded-xl rotate-45 bg-white border ${step >= 3 ? 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'border-slate-200'} flex items-center justify-center transition-colors duration-500`}
        >
          <div className="-rotate-45">
            <Cpu className={`w-5 h-5 ${step >= 3 ? 'text-cyan-400' : 'text-slate-400'} transition-colors duration-500`} />
          </div>
        </motion.div>
      </div>

      {/* Node 3: Delta Storage */}
      <div className="absolute top-[90px] left-[220px] -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div 
          animate={step === 4 ? { scale: [1, 1.1, 1] } : { scale: 1 }} 
          transition={{ duration: 1.5, repeat: step === 4 ? Infinity : 0, ease: "easeInOut" }}
          className={`w-10 h-12 rounded-lg bg-white border ${step >= 4 ? 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'border-slate-200'} flex flex-col items-center justify-center gap-0.5 transition-colors duration-500`}
        >
           <Layers className={`w-5 h-5 ${step >= 4 ? 'text-blue-400' : 'text-slate-400'} transition-colors duration-500`} />
        </motion.div>
      </div>

      {/* Node 4: Power BI Dashboard */}
      <div className="absolute top-[90px] left-[310px] -translate-x-1/2 -translate-y-1/2 z-10">
        <div className={`w-12 h-10 rounded-lg bg-white border ${step >= 5 ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-slate-200'} flex items-end justify-between p-1.5 gap-1 transition-colors duration-500`}>
          <motion.div animate={{ height: step >= 5 ? '50%' : '20%' }} transition={{ duration: 0.5 }} className={`w-full rounded-t-sm ${step >= 5 ? 'bg-emerald-400' : 'bg-slate-100'} transition-colors duration-500`} />
          <motion.div animate={{ height: step >= 5 ? '70%' : '30%' }} transition={{ duration: 0.5 }} className={`w-full rounded-t-sm ${step >= 5 ? 'bg-emerald-400' : 'bg-slate-100'} transition-colors duration-500`} />
          <motion.div animate={{ height: step >= 5 ? '100%' : '40%' }} transition={{ duration: 0.5 }} className={`w-full rounded-t-sm ${step >= 5 ? 'bg-emerald-400' : 'bg-slate-100'} transition-colors duration-500`} />
        </div>
      </div>
    </div>
  );
}

// 2. Data Warehousing Visualizer (Unified Diagram)
export function VisualDataWarehousing({
  mainColor = "#6366f1",
  gridColor = "#80808015",
  step: controlledStep,
}: VisualProps) {
  const isHovered = React.useContext(HoverContext);
  const [internalStep, setInternalStep] = React.useState(0);
  
  const step = controlledStep !== undefined ? controlledStep : internalStep;

  React.useEffect(() => {
    if (controlledStep !== undefined) return;
    if (!isHovered) {
      setInternalStep(0);
      return;
    }
    setInternalStep(1);
    const interval = setInterval(() => {
      setInternalStep((prev) => (prev < 5 ? prev + 1 : 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovered, controlledStep]);

  const labels = [
    "Enterprise Storage", 
    "1. Isolated Silos", 
    "2. Star Schema Modeling", 
    "3. Index Optimization", 
    "4. Global Replication", 
    "5. High Availability"
  ];

  return (
    <div className="relative h-full w-full bg-slate-50 overflow-hidden select-none">
      <GridLayer color={gridColor} />
      <EllipseGradient color={mainColor} />
      
      <Label text={labels[step]} color={step === 0 ? "#a1a1aa" : mainColor} visible={true} />
      <Tracker step={step} color={mainColor} />

      <DiagramPath startX={56} endX={114} active={step >= 2} activeColor="#6366f1" />
      <DiagramPath startX={146} endX={204} active={step >= 3} activeColor="#818cf8" />
      <DiagramPath startX={236} endX={294} active={step >= 4} activeColor="#10b981" />

      {/* Node 1: Silos */}
      <div className="absolute top-[90px] left-[40px] -translate-x-1/2 -translate-y-1/2 flex gap-1 z-10">
        <div className={`w-7 h-8 rounded bg-white border ${step === 1 ? 'border-red-500' : 'border-slate-200'} flex items-center justify-center transition-colors duration-500`}>
          <Database className={`w-3 h-3 ${step === 1 ? 'text-red-400' : 'text-slate-400'} transition-colors duration-500`} />
        </div>
        <div className={`w-7 h-8 rounded bg-white border ${step === 1 ? 'border-red-500' : 'border-slate-200'} flex items-center justify-center transition-colors duration-500`}>
          <Database className={`w-3 h-3 ${step === 1 ? 'text-red-400' : 'text-slate-400'} transition-colors duration-500`} />
        </div>
      </div>

      {/* Node 2: Star Schema Modeler */}
      <div className="absolute top-[90px] left-[130px] -translate-x-1/2 -translate-y-1/2 z-10">
        <div className={`w-12 h-12 rounded-full bg-white border ${step >= 2 ? 'border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'border-slate-200'} flex items-center justify-center relative transition-all duration-500`}>
          <Network className={`w-5 h-5 ${step >= 2 ? 'text-indigo-400' : 'text-slate-400'} transition-colors duration-500`} />
        </div>
      </div>

      {/* Node 3: Optimizer */}
      <div className="absolute top-[90px] left-[220px] -translate-x-1/2 -translate-y-1/2 z-10">
        <div className={`w-10 h-10 rounded-lg bg-white border ${step >= 3 ? 'border-blue-400' : 'border-slate-200'} flex flex-col justify-center gap-1.5 p-2 transition-colors duration-500`}>
          <motion.div animate={step >= 3 ? { width: '100%' } : { width: '40%' }} transition={{ duration: 0.8 }} className={`h-1 rounded-full ${step >= 3 ? 'bg-blue-400' : 'bg-slate-100'}`} />
          <motion.div animate={step >= 3 ? { width: '80%' } : { width: '60%' }} transition={{ duration: 0.8 }} className={`h-1 rounded-full ${step >= 3 ? 'bg-blue-400' : 'bg-slate-100'}`} />
          <motion.div animate={step >= 3 ? { width: '90%' } : { width: '30%' }} transition={{ duration: 0.8 }} className={`h-1 rounded-full ${step >= 3 ? 'bg-blue-400' : 'bg-slate-100'}`} />
        </div>
      </div>

      {/* Node 4: Global Availability */}
      <div className="absolute top-[90px] left-[310px] -translate-x-1/2 -translate-y-1/2 z-10">
        <div className={`w-12 h-12 rounded-full bg-white border ${step >= 5 ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : step >= 4 ? 'border-indigo-400' : 'border-slate-200'} flex items-center justify-center transition-colors duration-500`}>
          {step >= 5 ? <CheckCircle className="w-5 h-5 text-emerald-400" /> : <Globe className={`w-5 h-5 ${step >= 4 ? 'text-indigo-400 animate-spin' : 'text-slate-400'} transition-colors duration-500`} />}
        </div>
      </div>
    </div>
  );
}

// 3. Analytics Visualizer (Unified Diagram)
export function VisualAnalytics({
  mainColor = "#10b981",
  gridColor = "#80808015",
  step: controlledStep,
}: VisualProps) {
  const isHovered = React.useContext(HoverContext);
  const [internalStep, setInternalStep] = React.useState(0);
  
  const step = controlledStep !== undefined ? controlledStep : internalStep;

  React.useEffect(() => {
    if (controlledStep !== undefined) return;
    if (!isHovered) {
      setInternalStep(0);
      return;
    }
    setInternalStep(1);
    const interval = setInterval(() => {
      setInternalStep((prev) => (prev < 5 ? prev + 1 : 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovered, controlledStep]);

  const labels = [
    "Real-Time Intelligence", 
    "1. Noisy Metrics", 
    "2. Smart Filtering", 
    "3. Live Aggregation", 
    "4. Interactive Analysis", 
    "5. Actionable Insights"
  ];

  return (
    <div className="relative h-full w-full bg-slate-50 overflow-hidden select-none">
      <GridLayer color={gridColor} />
      <EllipseGradient color={mainColor} />
      
      <Label text={labels[step]} color={step === 0 ? "#a1a1aa" : mainColor} visible={true} />
      <Tracker step={step} color={mainColor} />

      <DiagramPath startX={56} endX={114} active={step >= 2} activeColor="#f59e0b" />
      <DiagramPath startX={146} endX={204} active={step >= 3} activeColor="#3b82f6" />
      <DiagramPath startX={236} endX={294} active={step >= 4} activeColor="#10b981" />

      {/* Node 1: Raw Data */}
      <div className="absolute top-[90px] left-[40px] -translate-x-1/2 -translate-y-1/2 z-10">
        <div className={`w-10 h-10 rounded-lg bg-white border ${step === 1 ? 'border-red-500' : 'border-slate-200'} flex items-center justify-center transition-colors duration-500`}>
          <Activity className={`w-5 h-5 ${step === 1 ? 'text-red-500' : 'text-slate-400'} transition-colors duration-500`} />
        </div>
      </div>

      {/* Node 2: Filter */}
      <div className="absolute top-[90px] left-[130px] -translate-x-1/2 -translate-y-1/2 z-10">
        <div className={`w-10 h-10 rounded-full bg-white border ${step >= 2 ? 'border-amber-400' : 'border-slate-200'} flex items-center justify-center transition-colors duration-500`}>
          <Filter className={`w-5 h-5 ${step >= 2 ? 'text-amber-400' : 'text-slate-400'} transition-colors duration-500`} />
        </div>
      </div>

      {/* Node 3: Aggregator */}
      <div className="absolute top-[90px] left-[220px] -translate-x-1/2 -translate-y-1/2 z-10">
        <div className={`w-10 h-10 rounded-lg bg-white border ${step >= 3 ? 'border-blue-400' : 'border-slate-200'} flex items-center justify-center transition-colors duration-500`}>
          <motion.div animate={step >= 3 ? { rotate: 360 } : {}} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
            <Cog className={`w-5 h-5 ${step >= 3 ? 'text-blue-400' : 'text-slate-400'} transition-colors duration-500`} />
          </motion.div>
        </div>
      </div>

      {/* Node 4: Dashboard */}
      <div className="absolute top-[90px] left-[310px] -translate-x-1/2 -translate-y-1/2 z-10">
        <div className={`w-12 h-10 rounded-lg bg-white border ${step >= 5 ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : step >= 4 ? 'border-emerald-400' : 'border-slate-200'} flex items-center justify-center transition-colors duration-500`}>
          <TrendingUp className={`w-5 h-5 ${step >= 5 ? 'text-emerald-400' : step >= 4 ? 'text-emerald-500' : 'text-slate-400'} transition-colors duration-500`} />
        </div>
      </div>
    </div>
  );
}

// 4. Cloud Platform Visualizer (Unified Diagram)
export function VisualCloudPlatform({
  mainColor = "#06b6d4",
  gridColor = "#80808015",
  step: controlledStep,
}: VisualProps) {
  const isHovered = React.useContext(HoverContext);
  const [internalStep, setInternalStep] = React.useState(0);
  
  const step = controlledStep !== undefined ? controlledStep : internalStep;

  React.useEffect(() => {
    if (controlledStep !== undefined) return;
    if (!isHovered) {
      setInternalStep(0);
      return;
    }
    setInternalStep(1);
    const interval = setInterval(() => {
      setInternalStep((prev) => (prev < 5 ? prev + 1 : 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovered, controlledStep]);

  const labels = [
    "Highly Available Infrastructure", 
    "1. Legacy Monolith", 
    "2. Containerization", 
    "3. Autoscaling", 
    "4. Multi-Cloud Mesh", 
    "5. Fault Tolerant"
  ];

  return (
    <div className="relative h-full w-full bg-slate-50 overflow-hidden select-none">
      <GridLayer color={gridColor} />
      <EllipseGradient color={mainColor} />
      
      <Label text={labels[step]} color={step === 0 ? "#a1a1aa" : mainColor} visible={true} />
      <Tracker step={step} color={mainColor} />

      <DiagramPath startX={56} endX={114} active={step >= 2} activeColor="#06b6d4" />
      <DiagramPath startX={146} endX={204} active={step >= 4} activeColor="#f97316" />
      <DiagramPath startX={236} endX={294} active={step >= 5} activeColor="#10b981" />

      {/* Node 1: Legacy */}
      <div className="absolute top-[90px] left-[40px] -translate-x-1/2 -translate-y-1/2 z-10">
        <div className={`w-10 h-10 rounded-lg bg-white border ${step === 1 ? 'border-red-500' : 'border-slate-200'} flex items-center justify-center transition-colors duration-500`}>
          <Users className={`w-5 h-5 ${step === 1 ? 'text-red-500' : 'text-slate-400'} transition-colors duration-500`} />
        </div>
      </div>

      {/* Node 2: K8s Split & Scale */}
      <div className="absolute top-[90px] left-[130px] -translate-x-1/2 -translate-y-1/2 z-10 w-14 h-14 flex flex-wrap gap-1 items-center justify-center">
        {step < 2 && (
          <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded flex items-center justify-center">
            <Server className="w-4 h-4 text-slate-400" />
          </div>
        )}
        {step === 2 && (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 bg-cyan-950 border border-cyan-500 rounded" />
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 bg-cyan-950 border border-cyan-500 rounded" />
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-4 h-4 bg-cyan-950 border border-cyan-500 rounded" />
          </>
        )}
        {step >= 3 && (
          <>
            {[1,2,3,4,5,6].map(i => (
               <motion.div key={i} animate={{ scale: [0.8, 1, 0.8] }} transition={{ delay: i*0.1, repeat: Infinity }} className="w-3 h-3 bg-cyan-500 rounded-sm" />
            ))}
          </>
        )}
      </div>

      {/* Node 3: Multi-Cloud */}
      <div className="absolute top-[90px] left-[220px] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col gap-1.5">
        <div className={`w-9 h-6 rounded bg-white border ${step >= 4 ? 'border-orange-500' : 'border-slate-200'} flex items-center justify-center transition-colors duration-500`}>
          <Cloud className={`w-3 h-3 ${step >= 4 ? 'text-orange-400' : 'text-slate-400'} transition-colors duration-500`} />
        </div>
        <div className={`w-9 h-6 rounded bg-white border ${step >= 4 ? 'border-blue-500' : 'border-slate-200'} flex items-center justify-center transition-colors duration-500`}>
          <Cloud className={`w-3 h-3 ${step >= 4 ? 'text-blue-400' : 'text-slate-400'} transition-colors duration-500`} />
        </div>
      </div>

      {/* Node 4: Secure Platform */}
      <div className="absolute top-[90px] left-[310px] -translate-x-1/2 -translate-y-1/2 z-10">
        <div className={`w-12 h-12 rounded-full bg-white border ${step >= 5 ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-slate-200'} flex items-center justify-center transition-colors duration-500`}>
          <Shield className={`w-5 h-5 ${step >= 5 ? 'text-emerald-400' : 'text-slate-400'} transition-colors duration-500`} />
        </div>
      </div>
    </div>
  );
}

// --- Supporting Layout Elements ---

interface GridLayerProps {
  color: string;
}

const GridLayer = ({ color }: GridLayerProps) => {
  return (
    <div
      style={{ "--grid-color": color } as React.CSSProperties}
      className="pointer-events-none absolute inset-0 z-[4] h-full w-full bg-transparent bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)] bg-[size:20px_20px] bg-center opacity-70 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
    />
  );
};

interface EllipseGradientProps {
  color: string;
}

const EllipseGradient = ({ color }: EllipseGradientProps) => {
  return (
    <div className="absolute inset-0 z-[5] flex h-full w-full items-center justify-center">
      <svg
        width="356"
        height="196"
        viewBox="0 0 356 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="356" height="180" fill="url(#paint)" />
        <defs>
          <radialGradient
            id="paint"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(178 98) rotate(90) scale(98 178)"
          >
            <stop stopColor={color} stopOpacity="0.15" />
            <stop offset="0.5" stopColor={color} stopOpacity="0.05" />
            <stop offset="1" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};
