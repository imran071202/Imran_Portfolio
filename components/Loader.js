"use client";

import { useEffect, useState } from "react";

const Loader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let frameId;
    let startTime;
    const duration = 1500;

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const nextProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(nextProgress);

      // Multi-line updates using green text colors
      const currentLogs = [];
      if (nextProgress >= 1)   currentLogs.push({ type: "info", text: "System system initilation..." });
      if (nextProgress >= 25)  currentLogs.push({ type: "data", text: "Information system: loadings..." });
      if (nextProgress >= 50)  currentLogs.push({ type: "info", text: "System system deporter..." });
      if (nextProgress >= 75)  currentLogs.push({ type: "info", text: "System system data functment..." });
      if (nextProgress >= 95)  currentLogs.push({ type: "data", text: "Information system stronymous..." });
      setLogs(currentLogs);

      if (nextProgress < 100) {
        frameId = window.requestAnimationFrame(tick);
      } else {
        const timeoutId = setTimeout(() => {
          onFinish?.();
        }, 200);
        return () => clearTimeout(timeoutId);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#050505] text-[#d5de25] font-mono select-none">
      {/* Radial Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.15),_transparent_60%)]" />
      
      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.06) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* CRT Scanline Effect Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 50%, rgba(0,0,0,1) 50%)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* Terminal Main Container */}
      <div className="relative w-11/12 md:w-full max-w-[500px] rounded-xl border border-[#d4af37]/40 bg-[#070707]/95 p-6 shadow-[0_0_50px_rgba(212,175,55,0.15)] backdrop-blur-md">
        
        {/* Terminal Header Bar with Red, Yellow, Green window circles */}
        <div className="relative mb-5 flex items-center border-b border-[#d4af37]/20 pb-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ef4444]" />
            <span className="h-3 w-3 rounded-full bg-[#eab308]" />
            <span className="h-3 w-3 rounded-full bg-[#22c55e]" />
          </div>
          <div className="absolute inset-x-0 text-center text-[0.65rem] md:text-[0.75rem] font-medium tracking-wider text-[cyan]/60">
            IMRAN SHAIKH // V2.0.26
          </div>
        </div>

        {/* Primary Loading Info */}
        <div className="flex items-center justify-between text-[0.95rem] font-bold tracking-[0.15em] uppercase text-[#d4af37]">
          <span className="flex items-center gap-1">
            LOADING
            <span className="animate-pulse">▋</span>
          </span>
          <span className="tabular-nums">{progress}%</span>
        </div>

        {/* Segmented Progress Matrix (Dot Dot Loader) - Fixed to stay on a single line on mobile */}
        <div className="mt-4 grid grid-cols-24 gap-0.5 sm:gap-1.5">
          {Array.from({ length: 24 }).map((_, index) => {
            const threshold = Math.round(((index + 1) / 24) * 100);
            return (
              <span
                key={index}
                className={`h-2 rounded-xs border transition-colors duration-150 ${
                  progress >= threshold 
                    ? 'bg-[#d4af37] border-[#f5d06b]/50 shadow-[0_0_6px_rgba(212,175,55,0.4)]' 
                    : 'bg-[#121212] border-transparent'
                }`}
              />
            );
          })}
        </div>

        {/* Multi-line Terminal Log Box */}
        <div className="mt-5 min-h-[140px] rounded-md border border-[#d4af37]/10 bg-[#020202] p-4 font-mono text-[0.78rem] tracking-wide leading-relaxed text-[#22c55e]/90">
          <div className="space-y-1">
            {logs.map((log, index) => (
              <div key={index} className="truncate">
                <span className="text-[#22c55e]/40">[status]</span>{" "}
                <span className="text-[#22c55e]/60">{log.type}]</span>{" "}
                <span>{log.text}</span>
              </div>
            ))}
            
            {/* Active entry line with blinking green block cursor */}
            <div className="flex items-center text-[#22c55e]">
              <span>&gt;</span>
              <span className="ml-1.5 h-3.5 w-2 bg-[#22c55e] animate-[pulse_1s_infinite]" />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Loader;