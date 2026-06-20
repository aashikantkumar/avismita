"use client";

import React, { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        <AlertCircle className="w-8 h-8 text-red-400" />
      </div>
      
      <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
        Something went wrong
      </h2>
      
      <p className="text-slate-400 text-lg max-w-md mx-auto mb-10 leading-relaxed">
        An unexpected error has occurred in the application. Our engineering team has been notified.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]"
        >
          <RefreshCw size={14} /> Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold uppercase tracking-widest text-xs transition-all"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
