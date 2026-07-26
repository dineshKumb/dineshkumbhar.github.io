"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const EXPERIENCES = [
  { id: 1, period: "2023 — Present", role: "Senior Data Engineer", company: "TechCorp Analytics", location: "Remote", achievements: ["Led migration to Microsoft Fabric, unifying data warehouse, lakehouse, and real-time analytics serving 500+ users", "Designed Delta Lake medallion architecture processing 10TB+ daily with SCD Type 2 tracking", "Built PySpark pipelines optimized for cost and performance, reducing compute costs by 40%", "Implemented real-time CDC pipeline using Azure Event Hubs and Databricks Structured Streaming", "Mentored a team of 4 junior data engineers on best practices"], layer: "gold" },
  { id: 2, period: "2021 — 2023", role: "Data Engineer", company: "DataFlow Systems", location: "Bangalore, India", achievements: ["Architected AWS-based data platform using Glue, Redshift, and Kinesis", "Built ETL pipelines processing 5TB+ monthly data from 30+ sources", "Implemented dbt transformations with 150+ models for self-service analytics", "Developed automated data quality framework with Great Expectations", "Created Power BI dashboards for executive reporting"], layer: "silver" },
  { id: 3, period: "2020 — 2021", role: "Junior Data Engineer", company: "CloudData Inc.", location: "Hyderabad, India", achievements: ["Developed SQL-based ETL pipelines for data warehouse loading with 99.5% accuracy", "Built Python scripts for data validation and automated reporting", "Assisted in migration from on-premise SQL Server to Azure Synapse", "Created documentation and runbooks for all data pipelines"], layer: "bronze" },
];

const layerColors: Record<string, { dot: string; glow: string; line: string; accent: string; bg: string; border: string }> = {
  bronze: { dot: "var(--color-bronze)", glow: "rgba(205,127,50,0.5)", line: "rgba(205,127,50,0.3)", accent: "text-bronze-light", bg: "rgba(205,127,50,0.05)", border: "border-bronze/20" },
  silver: { dot: "var(--color-silver)", glow: "rgba(192,192,192,0.5)", line: "rgba(192,192,192,0.3)", accent: "text-silver-light", bg: "rgba(192,192,192,0.05)", border: "border-silver/20" },
  gold: { dot: "var(--color-gold)", glow: "rgba(255,215,0,0.5)", line: "rgba(255,215,0,0.3)", accent: "text-gold", bg: "rgba(255,215,0,0.05)", border: "border-gold/20" },
};

function ExperienceItem({ exp, index, isLast }: { exp: (typeof EXPERIENCES)[0]; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const c = layerColors[exp.layer];

  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }} className="relative flex items-start gap-8 md:gap-12">
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full flex-shrink-0 z-10" style={{ background: c.dot, boxShadow: `0 0 20px ${c.glow}, 0 0 40px ${c.glow}` }} />
        {!isLast && <div className="w-px flex-1 mt-2" style={{ background: `linear-gradient(to bottom, ${c.line}, transparent)` }} />}
      </div>
      <div className={`glass-card rounded-2xl p-6 md:p-8 flex-1 ${c.border}`} style={{ background: `${c.bg}, rgba(11,15,36,0.6)` }}>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className={`text-xs font-mono ${c.accent}`}>{exp.period}</span>
          <span className="text-xs text-white/20">•</span>
          <span className="text-xs text-white/40">{exp.location}</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white/90 mb-1">{exp.role}</h3>
        <p className={`text-sm font-medium ${c.accent} mb-5`}>{exp.company}</p>
        <ul className="space-y-3">
          {exp.achievements.map((a, i) => (
            <motion.li key={i} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.2 + i * 0.1 + 0.3, ease: "easeOut" }} className="flex items-start gap-3 text-sm text-white/50 leading-relaxed">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${c.accent}`} />{a}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function ExperienceParticles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    size: seededRandom(i * 3) * 2 + 1,
    x: seededRandom(i * 5) * 100,
    y: seededRandom(i * 7) * 100,
    duration: 15 + seededRandom(i * 9) * 20,
    delay: seededRandom(i * 11) * 10,
    opacityBase: seededRandom(i * 13) * 0.15 + 0.03,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div key={i} className="absolute rounded-full bg-electric/30" style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }} animate={{ y: [0, -60 + seededRandom(i * 17) * 30, 0], x: [0, -30 + seededRandom(i * 19) * 60, 0], opacity: [p.opacityBase, p.opacityBase * 2, p.opacityBase] }} transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }} />
      ))}
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("#experience-title", { scrollTrigger: { trigger: "#experience-title", start: "top 80%", toggleActions: "play none none reverse" }, y: 80, opacity: 0, rotateX: -10, filter: "blur(10px)", duration: 1.2, ease: "power4.out" });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative py-32 md:py-40 overflow-hidden" style={{ background: "linear-gradient(180deg, var(--color-navy-900) 0%, var(--color-navy-800) 50%, var(--color-navy-900) 100%)" }}>
      <ExperienceParticles />
      <div className="absolute w-[600px] h-[600px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)", top: "40%", left: "50%", transform: "translate(-50%, -50%)", filter: "blur(80px)" }} />
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: true }} className="inline-block text-xs font-mono tracking-widest uppercase text-electric/60 mb-4">Career Path</motion.span>
          <h2 id="experience-title" className="text-display-md md:text-display-lg font-bold tracking-tighter mb-6">Professional <span className="gradient-text">Experience</span></h2>
          <p className="text-body text-white/50 max-w-2xl mx-auto">A track record of building data platforms that scale — from initial architecture to production at enterprise level.</p>
        </div>
        <div className="relative">
          {EXPERIENCES.map((exp, index) => <ExperienceItem key={exp.id} exp={exp} index={index} isLast={index === EXPERIENCES.length - 1} />)}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, var(--color-navy-900), transparent)" }} />
    </section>
  );
}
