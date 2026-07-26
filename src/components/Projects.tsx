"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const PROJECTS = [
  { id: 1, title: "Enterprise Lakehouse Pipeline", description: "Built a medallion architecture pipeline processing 10TB+ daily with Bronze → Silver → Gold layers using Delta Lake and Microsoft Fabric.", longDescription: "Designed and implemented a complete lakehouse architecture using Microsoft Fabric and Delta Lake. The pipeline ingests data from 20+ sources, processes it through Bronze (raw), Silver (cleaned), and Gold (aggregated) layers, and delivers real-time dashboards to 500+ stakeholders.", tags: ["Microsoft Fabric", "Delta Lake", "PySpark", "Medallion Architecture"], metrics: ["10TB+ daily", "99.9% uptime", "20+ sources", "500+ users"], layer: "gold", gradient: "from-gold/20 to-electric/20", icon: "🏗️" },
  { id: 2, title: "Real-Time CDC Streaming Platform", description: "Implemented change data capture (CDC) pipeline using Azure Event Hubs and Databricks for real-time data synchronization across systems.", longDescription: "Built a real-time CDC pipeline that captures database changes and streams them to a lakehouse for analytics. Uses Azure Event Hubs for ingestion, Databricks Structured Streaming for processing, and Delta Lake for storage.", tags: ["Databricks", "Event Hubs", "Structured Streaming", "CDC"], metrics: ["<1s latency", "1M+ events/min", "Zero data loss", "Auto-scaling"], layer: "silver", gradient: "from-silver/20 to-electric/20", icon: "⚡" },
  { id: 3, title: "SCD Type 2 Dimensional Tracking", description: "Engineered a comprehensive SCD Type 2 solution for tracking historical changes across 50+ business dimensions with full audit trail.", longDescription: "Created a robust Slowly Changing Dimension Type 2 implementation that tracks historical changes across 50+ business entities. Includes automated history management, effective date tracking, and comprehensive audit trails.", tags: ["SCD Type 2", "Data Modeling", "SQL", "Python"], metrics: ["50+ dimensions", "95% fewer errors", "Full audit trail", "Auto-reconciliation"], layer: "silver", gradient: "from-silver/20 to-bronze/20", icon: "🔄" },
  { id: 4, title: "Automated Reporting & Analytics Suite", description: "Developed an automated reporting platform with Power BI integration, reducing manual reporting effort by 80% and enabling self-service analytics.", longDescription: "Built a comprehensive automated reporting suite that replaces 20+ manual reports. Includes data modeling, Power BI dashboard development, automated refresh pipelines, and self-service analytics capabilities.", tags: ["Power BI", "dbt", "Automation", "Data Modeling"], metrics: ["80% less effort", "300+ users", "20+ reports", "Real-time refresh"], layer: "gold", gradient: "from-gold/20 to-bronze/20", icon: "📊" },
];

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0), y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 5);
    y.set(((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); setIsHovered(false); };

  const borderMap: Record<string, string> = { bronze: "border-bronze/20", silver: "border-silver/20", gold: "border-gold/20" };
  const dotColors: Record<string, string> = { bronze: "var(--color-bronze)", silver: "var(--color-silver)", gold: "var(--color-gold)" };
  const textColors: Record<string, string> = { bronze: "text-bronze-light", silver: "text-silver-light", gold: "text-gold" };

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 60 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={() => setIsHovered(true)} className="group relative">
      <motion.div className="glass-card rounded-3xl overflow-hidden h-full" style={{ rotateX: mouseX, rotateY: mouseY, transformStyle: "preserve-3d" }}>
        <div className={`h-1 bg-gradient-to-r ${project.gradient}`} />
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <span className="text-4xl">{project.icon}</span>
            <span className={`tag ${textColors[project.layer]}`}>{project.layer.charAt(0).toUpperCase() + project.layer.slice(1)}</span>
          </div>
          <h3 className="text-xl font-bold text-white/90 mb-3 group-hover:text-white transition-colors">{project.title}</h3>
          <p className="text-sm text-white/50 leading-relaxed mb-6">{project.description}</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {project.metrics.map((m) => <div key={m} className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dotColors[project.layer] }} /><span className="text-xs text-white/40">{m}</span></div>)}
          </div>
          <div className="flex flex-wrap gap-2 mb-6">{project.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? "auto" : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden"><p className="text-sm text-white/40 leading-relaxed border-t border-white/5 pt-4">{project.longDescription}</p></motion.div>
          <div className="flex items-center gap-4 mt-4">
            <motion.button className="btn-ghost" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><span className="text-sm font-medium">View Details</span><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DataParticles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    size: seededRandom(i * 3) * 3 + 1,
    x: seededRandom(i * 5) * 100,
    y: seededRandom(i * 7) * 100,
    duration: 12 + seededRandom(i * 9) * 18,
    delay: seededRandom(i * 11) * 8,
    colorIdx: i % 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div key={i} className="absolute rounded-full" style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, background: p.colorIdx === 0 ? "rgba(255,215,0,0.4)" : p.colorIdx === 1 ? "rgba(0,212,255,0.3)" : "rgba(205,127,50,0.3)" }} animate={{ y: [0, -80 + seededRandom(i * 13) * 40, 0], x: [0, -40 + seededRandom(i * 17) * 80, 0], opacity: [seededRandom(i * 19) * 0.2 + 0.05, (seededRandom(i * 19) * 0.2 + 0.05) * 2, seededRandom(i * 19) * 0.2 + 0.05] }} transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }} />
      ))}
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("#projects-title", { scrollTrigger: { trigger: "#projects-title", start: "top 80%", toggleActions: "play none none reverse" }, y: 80, opacity: 0, rotateX: -10, filter: "blur(10px)", duration: 1.2, ease: "power4.out" });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) { if ((window as any).lenis) (window as any).lenis.scrollTo(id, { offset: -80 }); else el.scrollIntoView({ behavior: "smooth" }); }
  };

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 md:py-40 overflow-hidden" style={{ background: "linear-gradient(180deg, var(--color-navy-900) 0%, var(--color-navy-700) 50%, var(--color-navy-900) 100%)" }}>
      <DataParticles />
      <div className="absolute w-[600px] h-[600px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)", top: "30%", left: "50%", transform: "translate(-50%, -50%)", filter: "blur(80px)" }} />
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: true }} className="inline-block text-xs font-mono tracking-widest uppercase text-gold/60 mb-4">Layer 03 — Gold</motion.span>
          <h2 id="projects-title" className="text-display-md md:text-display-lg font-bold tracking-tighter mb-6">Featured <span className="gradient-text-gold">Projects</span></h2>
          <p className="text-body text-white/50 max-w-2xl mx-auto">A showcase of data engineering projects that transform raw data into polished, actionable insights at enterprise scale.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </div>
        <motion.div className="text-center mt-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}>
          <p className="text-sm text-white/40 mb-6">Want to see more? Let's build something amazing together.</p>
          <motion.button className="btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => scrollTo("contact")}>Get in Touch<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></motion.button>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, var(--color-navy-900), transparent)" }} />
    </section>
  );
}
