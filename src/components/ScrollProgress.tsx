"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [layer, setLayer] = useState<"bronze" | "silver" | "gold">("bronze");

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      if (scrollProgress < 33) setLayer("bronze");
      else if (scrollProgress < 66) setLayer("silver");
      else setLayer("gold");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollProgress]);

  const colors = {
    bronze: { bar: "#CD7F32", glow: "rgba(205,127,50,0.5)" },
    silver: { bar: "#C0C0C0", glow: "rgba(192,192,192,0.5)" },
    gold: { bar: "#FFD700", glow: "rgba(255,215,0,0.5)" },
  };
  const c = colors[layer];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <motion.div className="h-0.5" style={{ background: `linear-gradient(90deg, ${c.bar}, ${layer === "gold" ? "#FFD700" : layer === "silver" ? "#E8E8E8" : "#E8A862"})`, boxShadow: `0 0 10px ${c.glow}` }} initial={{ scaleX: 0 }} animate={{ scaleX: scrollProgress / 100 }} transition={{ duration: 0.1, ease: "linear" }} style={{ transformOrigin: "left" }} />
    </div>
  );
}
