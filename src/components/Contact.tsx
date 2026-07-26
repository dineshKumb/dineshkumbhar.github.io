"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/dineshk030799/", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
  { name: "GitHub", url: "https://github.com/dineshKumb", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> },
  { name: "Email", url: "mailto:dineshkumbhar806@gmail.com", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
];

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {(["name", "email", "message"] as const).map((field) => (
        <div key={field}>
          <label htmlFor={field} className="block text-sm font-medium text-white/60 mb-2 capitalize">{field}</label>
          {field === "message" ? (
            <textarea id={field} name={field} value={formData[field]} onChange={(e) => setFormData((p) => ({ ...p, [field]: e.target.value }))} required rows={5} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-all resize-none" placeholder={`Tell me about your ${field}...`} />
          ) : (
            <input type={field === "email" ? "email" : "text"} id={field} name={field} value={formData[field]} onChange={(e) => setFormData((p) => ({ ...p, [field]: e.target.value }))} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/20 transition-all" placeholder={`Your ${field}...`} />
          )}
        </div>
      ))}
      <motion.button type="submit" className="btn-primary w-full" disabled={isSubmitting} whileHover={!isSubmitting ? { scale: 1.02 } : {}} whileTap={!isSubmitting ? { scale: 0.98 } : {}}>
        {isSubmitting ? <span className="flex items-center justify-center gap-2"><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Sending...</span> : isSubmitted ? <span className="flex items-center justify-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Message Sent!</span> : "Send Message"}
      </motion.button>
    </form>
  );
}

function GlowingOrb() {
  return (
    <motion.div className="absolute w-[300px] h-[300px] rounded-full" style={{ background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)", filter: "blur(40px)" }} animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.9, 1], opacity: [0.3, 0.5, 0.3, 0.3] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("#contact-title", { scrollTrigger: { trigger: "#contact-title", start: "top 80%", toggleActions: "play none none reverse" }, y: 80, opacity: 0, rotateX: -10, filter: "blur(10px)", duration: 1.2, ease: "power4.out" });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 md:py-40 overflow-hidden" style={{ background: "linear-gradient(180deg, var(--color-navy-900) 0%, var(--color-navy-700) 50%, var(--color-navy-900) 100%)" }}>
      <GlowingOrb />
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: true }} className="inline-block text-xs font-mono tracking-widest uppercase text-gold/60 mb-4">Let's Connect</motion.span>
          <h2 id="contact-title" className="text-display-md md:text-display-lg font-bold tracking-tighter mb-6">Ready to Build the <span className="gradient-text-gold">Future of Data</span>?</h2>
          <p className="text-body text-white/50 max-w-2xl mx-auto">Whether you have a data challenge, an exciting opportunity, or just want to chat about lakehouse architectures — I'd love to hear from you.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h3 className="text-heading font-semibold text-white/90 mb-6">Get in Touch</h3>
            <p className="text-sm text-white/50 leading-relaxed mb-8">I'm always interested in new opportunities, collaborations, and conversations about data engineering. Drop me a message and I'll get back to you within 24 hours.</p>
            <div className="space-y-4 mb-8">
              {SOCIAL_LINKS.map((link) => (
                <motion.a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl glass-card-hover group" whileHover={{ x: 8 }} whileTap={{ scale: 0.98 }}>
                  <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center text-electric group-hover:bg-electric/20 transition-colors">{link.icon}</div>
                  <div><span className="text-sm font-medium text-white/80 group-hover:text-electric transition-colors">{link.name}</span><p className="text-xs text-white/30">{link.name === "Email" ? "dineshkumbhar806@gmail.com" : link.name === "LinkedIn" ? "linkedin.com/in/dineshk030799" : "github.com/dineshKumb"}</p></div>
                </motion.a>
              ))}
            </div>
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" /><span className="text-sm text-white/60">Available for new opportunities</span></div>
            </div>
          </div>
          <div id="contact-form"><div className="glass-card rounded-2xl p-8"><ContactForm /></div></div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, var(--color-navy-900), transparent)" }} />
    </section>
  );
}
