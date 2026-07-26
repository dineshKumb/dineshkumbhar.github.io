"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Deterministic pseudo-random based on index (replaces Math.random for SSR)
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function useMouseParallax(strength = 0.02) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set((e.clientX - window.innerWidth / 2) * strength);
      y.set((e.clientY - window.innerHeight / 2) * strength);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [strength]);
  return { x, y };
}

function HeroParticles() {
  // Pre-generate deterministic values
  const particles = Array.from({ length: 50 }, (_, i) => ({
    size: seededRandom(i * 3) * 3 + 1,
    x: seededRandom(i * 5) * 100,
    y: seededRandom(i * 7) * 100,
    duration: 10 + seededRandom(i * 9) * 20,
    delay: seededRandom(i * 11) * 10,
    opacity: seededRandom(i * 13) * 0.3 + 0.05,
    colorIdx: i % 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: p.colorIdx === 0 ? "rgba(0,212,255,0.6)" : p.colorIdx === 1 ? "rgba(255,215,0,0.4)" : "rgba(205,127,50,0.4)",
            boxShadow: p.colorIdx === 0 ? "0 0 6px rgba(0,212,255,0.3)" : p.colorIdx === 1 ? "0 0 6px rgba(255,215,0,0.2)" : "0 0 6px rgba(205,127,50,0.2)",
          }}
          animate={{ y: [0, -100 + seededRandom(i * 17) * 50], x: [0, -50 + seededRandom(i * 19) * 100], opacity: [p.opacity, p.opacity, p.opacity] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}

function FloatingShapes() {
  const shapes = [
    { type: "cube", size: 60, x: 15, y: 20 },
    { type: "sphere", size: 40, x: 75, y: 15 },
    { type: "ring", size: 80, x: 80, y: 60 },
    { type: "cube", size: 30, x: 20, y: 70 },
    { type: "octahedron", size: 50, x: 60, y: 40 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div key={i} className="absolute" style={{ width: shape.size, height: shape.size, left: `${shape.x}%`, top: `${shape.y}%` }} animate={{ y: [0, -30 + seededRandom(i * 23) * 20, 0], rotate: [0, 180, 360], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}>
          {shape.type === "cube" && <div className="w-full h-full border border-electric/20 rounded-lg" style={{ background: "rgba(0,212,255,0.03)", backdropFilter: "blur(4px)" }} />}
          {shape.type === "sphere" && <div className="w-full h-full rounded-full border border-gold/20" style={{ background: "rgba(255,215,0,0.03)" }} />}
          {shape.type === "ring" && <div className="w-full h-full rounded-full border-2 border-bronze/20" style={{ background: "transparent" }} />}
          {shape.type === "octahedron" && <svg viewBox="0 0 100 100" className="w-full h-full"><polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="rgba(205,127,50,0.2)" strokeWidth="1" /></svg>}
        </motion.div>
      ))}
    </div>
  );
}

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {Array.from({ length: 20 }).map((_, i) => <div key={`v-${i}`} className="absolute top-0 bottom-0" style={{ left: `${(i + 1) * 5}%`, width: "1px", background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.3), transparent)" }} />)}
      {Array.from({ length: 15 }).map((_, i) => <div key={`h-${i}`} className="absolute left-0 right-0" style={{ top: `${(i + 1) * 6.66}%`, height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)" }} />)}
    </div>
  );
}

export default function Hero() {
  const { x, y } = useMouseParallax(0.015);
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });
  const parallaxX = useTransform(springX, (val) => `${val}px`);
  const parallaxY = useTransform(springY, (val) => `${val}px`);

  useEffect(() => {
    setIsLoaded(true);
    const ctx = gsap.context(() => {
      gsap.from("#hero-name", { y: 100, opacity: 0, rotateX: -30, filter: "blur(20px)", duration: 1.8, ease: "power4.out", delay: 0.5 });
      gsap.from("#hero-subtitle", { y: 40, opacity: 0, duration: 1.2, ease: "power3.out", delay: 1 });
      gsap.from("#hero-tags .tag", { y: 20, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power2.out", delay: 1.4 });
      gsap.to("#scroll-indicator", { y: 12, duration: 1.5, repeat: -1, yoyo: true, ease: "power2.inOut" });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) { if ((window as any).lenis) (window as any).lenis.scrollTo(id, { offset: -80 }); else el.scrollIntoView({ behavior: "smooth" }); }
  };

  return (
    <div ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 60%), var(--color-navy-900)" }}>
      <GridBackground />
      <HeroParticles />
      <FloatingShapes />
      <motion.div className="absolute w-[600px] h-[600px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)", x: parallaxX, y: parallaxY, filter: "blur(60px)" }} animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isLoaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-widest uppercase"><span className="w-2 h-2 rounded-full bg-electric animate-pulse" />Available for opportunities</span>
        </motion.div>
        <motion.h1 id="hero-name" className="text-display-xl md:text-display-xl font-bold tracking-tighter mb-6" style={{ x: parallaxX, y: parallaxY }}><span className="gradient-text">Dinesh Kumbhar</span></motion.h1>
        <motion.p id="hero-subtitle" className="text-heading md:text-display-sm text-white/60 font-light tracking-wide mb-8 max-w-3xl mx-auto">Data Engineer | Microsoft Fabric • PySpark • Delta Lake</motion.p>
        <motion.div id="hero-tags" className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {["Lakehouse Architecture", "Data Pipelines", "ETL/ELT", "Cloud Data", "Real-time Processing"].map((tag) => <span key={tag} className="tag">{tag}</span>)}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isLoaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }} className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <motion.button className="btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => scrollTo("projects")}>View Projects<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></motion.button>
          <motion.button className="btn-outline" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => scrollTo("contact")}>Get in Touch</motion.button>
        </motion.div>
        <motion.div id="scroll-indicator" className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/30 tracking-widest uppercase">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-electric/60" animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, var(--color-navy-900), transparent)" }} />
    </div>
  );
}
