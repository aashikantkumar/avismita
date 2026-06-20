export default function Loading() {
  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center p-6">
      {/* Premium minimal loader */}
      <div className="relative w-16 h-16">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin" />
        
        {/* Inner pulse */}
        <div className="absolute inset-4 rounded-full bg-blue-500/20 animate-pulse blur-sm" />
        
        {/* Center dot */}
        <div className="absolute inset-[26px] rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.8)]" />
      </div>
      
      <div className="mt-8 text-[10px] font-mono text-blue-400 font-bold uppercase tracking-[0.3em] animate-pulse">
        Initializing Workspace...
      </div>
    </div>
  );
}
