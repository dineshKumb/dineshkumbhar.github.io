"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="flex flex-col items-center gap-8">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative">
          <div className="w-24 h-24 rounded-2xl glass-card flex items-center justify-center"><span className="text-3xl font-bold gradient-text">DK</span></div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-2xl border border-electric/20" style={{ margin: "-8px" }} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-center">
          <p className="text-sm font-medium text-white/40 tracking-widest uppercase mb-2">Initializing Data Lakehouse</p>
          <p className="text-xs text-white/20 font-mono">{Math.min(Math.round(progress), 100)}%</p>
        </motion.div>
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, var(--color-electric), var(--color-gold))" }} initial={{ width: 0 }} animate={{ width: `${Math.min(progress, 100)}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>
    </div>
  );
}
