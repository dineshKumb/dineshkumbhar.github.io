"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const SKILLS = [
  { name: "Microsoft Fabric", category: "platform", icon: "🏛️", description: "Unified analytics platform for data engineering, data science, and BI.", proficiency: 95 },
  { name: "Databricks", category: "platform", icon: "🔷", description: "Lakehouse platform for building and managing data pipelines at scale.", proficiency: 90 },
  { name: "AWS Glue", category: "platform", icon: "☁️", description: "Serverless ETL service for preparing and loading data for analytics.", proficiency: 85 },
  { name: "Azure Data Factory", category: "platform", icon: "🌐", description: "Cloud-based data integration for orchestrating ETL/ELT workflows.", proficiency: 88 },
  { name: "PySpark", category: "language", icon: "⚡", description: "Distributed data processing framework for large-scale transformation.", proficiency: 95 },
  { name: "Python", category: "language", icon: "🐍", description: "Core language for data engineering, automation, and analytics pipelines.", proficiency: 92 },
  { name: "SQL", category: "language", icon: "🗄️", description: "Advanced SQL for complex queries, CTEs, window functions, optimization.", proficiency: 94 },
  { name: "Scala", category: "language", icon: "🔺", description: "Functional programming for Spark ecosystem and distributed computing.", proficiency: 75 },
  { name: "Delta Lake", category: "architecture", icon: "💎", description: "Open-source storage layer bringing ACID transactions to data lakes.", proficiency: 93 },
  { name: "SCD Type 2", category: "architecture", icon: "🔄", description: "Slowly changing dimension tracking for historical data management.", proficiency: 90 },
  { name: "Medallion Architecture", category: "architecture", icon: "🏗️", description: "Bronze-Silver-Gold data layering for organized data processing.", proficiency: 95 },
  { name: "Data Modeling", category: "architecture", icon: "📐", description: "Dimensional and normalized modeling for star schemas and warehouses.", proficiency: 88 },
  { name: "dbt", category: "tool", icon: "🔧", description: "Data build tool for analytics engineering with SQL-based transformations.", proficiency: 85 },
  { name: "Airflow", category: "tool", icon: "🌊", description: "Workflow orchestration for scheduling and monitoring data pipelines.", proficiency: 82 },
  { name: "Git & CI/CD", category: "tool", icon: "🔀", description: "Version control and automated deployment for data engineering projects.", proficiency: 88 },
  { name: "Power BI", category: "tool", icon: "📊", description: "Business intelligence and data visualization for stakeholder reporting.", proficiency: 80 },
];

function SkillCard({ skill, index }: { skill: (typeof SKILLS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    setTilt({ x: ((y - rect.height / 2) / (rect.height / 2)) * -8, y: ((x - rect.width / 2) / (rect.width / 2)) * 8 });
  };

  const handleMouseLeave = () => { setTilt({ x: 0, y: 0 }); setIsHovered(false); };

  const catColors: Record<string, string> = { platform: "text-electric", language: "text-gold", architecture: "text-bronze", tool: "text-silver" };
  const borderMap: Record<string, string> = { platform: "border-electric/20", language: "border-gold/20", architecture: "border-bronze/20", tool: "border-silver/20" };
  const barColors: Record<string, string> = { platform: "var(--color-electric)", language: "var(--color-gold)", architecture: "var(--color-bronze)", tool: "var(--color-silver)" };

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }} whileHover={{ scale: 1.05 }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onMouseEnter={() => setIsHovered(true)} className={`glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 border ${borderMap[skill.category]} ${isHovered ? "shadow-electric" : ""}`} style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)` }}>
      <div className="text-3xl mb-4">{skill.icon}</div>
      <h4 className="text-base font-semibold text-white/90 mb-1">{skill.name}</h4>
      <span className={`text-xs ${catColors[skill.category]} font-medium`}>{skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}</span>
      <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${barColors[skill.category]}, ${barColors[skill.category]}-light)` }} initial={{ width: 0 }} animate={{ width: isInView ? `${skill.proficiency}%` : "0%" }} transition={{ duration: 1.2, delay: index * 0.05 + 0.3, ease: "easeOut" }} />
      </div>
      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? "auto" : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden"><p className="text-xs text-white/40 mt-3 leading-relaxed">{skill.description}</p></motion.div>
    </motion.div>
  );
}

function ConstellationParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    size: seededRandom(i * 3) * 2 + 1,
    x: seededRandom(i * 5) * 100,
    y: seededRandom(i * 7) * 100,
    duration: 15 + seededRandom(i * 9) * 20,
    delay: seededRandom(i * 11) * 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div key={i} className="absolute rounded-full bg-electric/20" style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }} animate={{ y: [0, -50 + seededRandom(i * 13) * 30, 0], x: [0, -30 + seededRandom(i * 17) * 60, 0], opacity: [0.1, 0.4, 0.1] }} transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }} />
      ))}
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("#skills-title", { scrollTrigger: { trigger: "#skills-title", start: "top 80%", toggleActions: "play none none reverse" }, y: 80, opacity: 0, rotateX: -10, filter: "blur(10px)", duration: 1.2, ease: "power4.out" });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const categories = ["all", ...new Set(SKILLS.map((s) => s.category))];
  const filtered = activeCategory === "all" ? SKILLS : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 md:py-40 overflow-hidden" style={{ background: "linear-gradient(180deg, var(--color-navy-900) 0%, var(--color-navy-800) 50%, var(--color-navy-900) 100%)" }}>
      <motion.div className="absolute w-[600px] h-[600px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)", x: mousePos.x - 300, y: mousePos.y - 300, filter: "blur(80px)" }} />
      <ConstellationParticles />
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: true }} className="inline-block text-xs font-mono tracking-widest uppercase text-electric/60 mb-4">Layer 02 — Silver</motion.span>
          <h2 id="skills-title" className="text-display-md md:text-display-lg font-bold tracking-tighter mb-6">The <span className="gradient-text">Tech Stack</span></h2>
          <p className="text-body text-white/50 max-w-2xl mx-auto">A curated collection of technologies I use to build robust, scalable data platforms.</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <motion.button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat ? "bg-electric/20 text-electric border border-electric/30" : "bg-white/5 text-white/40 border border-white/10 hover:text-white/70 hover:border-white/20"}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</motion.button>
          ))}
        </div>
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((skill, index) => <SkillCard key={skill.name} skill={skill} index={index} />)}
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, var(--color-navy-900), transparent)" }} />
    </section>
  );
}
