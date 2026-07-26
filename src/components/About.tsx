"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000, steps = 60, increment = target / steps;
    let current = 0, step = 0;
    const timer = setInterval(() => { step++; current = Math.min(Math.round(increment * step), target); setCount(current); if (step >= steps) clearInterval(timer); }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function TimelineItem({ year, title, description, delay }: { year: string; title: string; description: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay, ease: "easeOut" }} className="relative pl-8 pb-8 border-l border-white/10 last:pb-0">
      <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full" style={{ background: "var(--color-electric)", boxShadow: "0 0 10px rgba(0,212,255,0.5)" }} />
      <span className="text-sm font-mono text-electric/60 mb-1 block">{year}</span>
      <h4 className="text-lg font-semibold text-white/90 mb-2">{title}</h4>
      <p className="text-sm text-white/50 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("#about-title", { scrollTrigger: { trigger: "#about-title", start: "top 80%", toggleActions: "play none none reverse" }, y: 80, opacity: 0, rotateX: -10, filter: "blur(10px)", duration: 1.2, ease: "power4.out" });
      gsap.from("#about-stats .stat-item", { scrollTrigger: { trigger: "#about-stats", start: "top 75%", toggleActions: "play none none reverse" }, y: 40, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) { if ((window as any).lenis) (window as any).lenis.scrollTo(id, { offset: -80 }); else el.scrollIntoView({ behavior: "smooth" }); }
  };

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden" style={{ background: "linear-gradient(180deg, var(--color-navy-900) 0%, var(--color-navy-800) 50%, var(--color-navy-900) 100%)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: true }} className="inline-block text-xs font-mono tracking-widest uppercase text-electric/60 mb-4">Layer 01 — Bronze</motion.span>
          <h2 id="about-title" className="text-display-md md:text-display-lg font-bold tracking-tighter mb-6">From <span className="gradient-text-bronze">Raw Data</span> to <span className="gradient-text-silver">Refined Insights</span></h2>
          <p className="text-body text-white/50 max-w-2xl mx-auto">Every great data platform starts with a vision. Mine began with a simple question: how can we transform chaotic, raw data into reliable, actionable intelligence?</p>
        </div>
        <div id="about-stats" className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {[{ value: 5, suffix: "+", label: "Years Experience" }, { value: 50, suffix: "+", label: "Data Pipelines Built" }, { value: 10, suffix: "TB+", label: "Data Processed Daily" }, { value: 99, suffix: ".9%", label: "Pipeline Uptime" }].map((stat, i) => (
            <motion.div key={stat.label} className="stat-item glass-card rounded-2xl p-6 text-center" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }} viewport={{ once: true }}>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2"><AnimatedCounter target={stat.value} suffix={stat.suffix} /></div>
              <div className="text-xs text-white/40 tracking-wide uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h3 className="text-heading font-semibold text-white/90 mb-6">The Journey</h3>
            <div className="space-y-4 text-sm text-white/50 leading-relaxed">
              <p>I'm a Data Engineer passionate about building robust, scalable data platforms. My expertise spans the entire data lifecycle — from ingesting raw data through complex transformations to delivering polished, production-ready insights.</p>
              <p>I specialize in <strong className="text-white/80">Microsoft Fabric</strong>, <strong className="text-white/80">PySpark</strong>, and <strong className="text-white/80">Delta Lake</strong>, with deep experience in medallion architecture, SCD Type 2 implementations, and real-time streaming pipelines.</p>
              <p>My approach combines engineering rigor with creative problem-solving. Great data engineering isn't just about making things work — it's about making them work beautifully, reliably, and at scale.</p>
            </div>
            <motion.div className="mt-8" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <button className="btn-primary" onClick={() => scrollTo("projects")}>Explore My Work<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></button>
            </motion.div>
          </div>
          <div>
            <h3 className="text-heading font-semibold text-white/90 mb-6">Key Milestones</h3>
            <div id="about-timeline">
              <TimelineItem year="2024" title="Microsoft Fabric Expert" description="Led migration to Microsoft Fabric, unifying data warehouse, lakehouse, and real-time analytics." delay={0.2} />
              <TimelineItem year="2023" title="Delta Lake Architecture" description="Designed Delta Lake medallion architecture processing 10TB+ daily with SCD Type 2 tracking." delay={0.4} />
              <TimelineItem year="2022" title="PySpark at Scale" description="Built distributed PySpark pipelines processing millions of records with optimized strategies." delay={0.6} />
              <TimelineItem year="2021" title="Cloud Data Platform" description="Architected AWS-based data platform with Glue, Redshift, and Kinesis." delay={0.8} />
              <TimelineItem year="2020" title="Data Engineering Foundation" description="Started the journey — learned SQL, Python, ETL patterns, and fell in love with data." delay={1.0} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, var(--color-navy-900), transparent)" }} />
    </section>
  );
}
