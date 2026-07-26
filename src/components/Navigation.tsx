"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setIsVisible(scrollY > window.innerHeight * 0.5);
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) { setActiveSection(sections[i]); break; }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((href: string) => {
    const id = href.substring(1);
    const el = document.getElementById(id);
    if (el) {
      setIsMenuOpen(false);
      if ((window as any).lenis) { (window as any).lenis.scrollTo(id, { offset: -80, duration: 1.5 }); }
      else { el.scrollIntoView({ behavior: "smooth", block: "start" }); }
    }
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "py-4" : "py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className={`flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500 ${isScrolled ? "glass-card backdrop-blur-xl" : "bg-transparent"}`}>
            <button onClick={() => scrollToSection("#hero")} className="text-lg font-bold tracking-tight gradient-text">DK</button>
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button key={item.href} onClick={() => scrollToSection(item.href)} className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${activeSection === item.href.substring(1) ? "text-electric" : "text-white/50 hover:text-white/80"}`}>
                  {item.label}
                  {activeSection === item.href.substring(1) && <motion.span layoutId="activeNav" className="absolute inset-0 rounded-full bg-electric/10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                </button>
              ))}
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full glass-card" aria-label="Toggle menu">
              <motion.span animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }} className="block w-5 h-0.5 bg-white/70" />
              <motion.span animate={{ opacity: isMenuOpen ? 0 : 1, scaleX: isMenuOpen ? 0 : 1 }} className="block w-5 h-0.5 bg-white/70" />
              <motion.span animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }} className="block w-5 h-0.5 bg-white/70" />
            </button>
          </div>
        </div>
      </motion.nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-40 md:hidden" style={{ background: "linear-gradient(180deg, rgba(10,14,39,0.98) 0%, rgba(6,8,24,0.98) 100%)", backdropFilter: "blur(20px)" }}>
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_ITEMS.map((item, index) => (
                <motion.button key={item.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0, transition: { delay: index * 0.08 } }} onClick={() => scrollToSection(item.href)} className={`text-2xl font-semibold tracking-tight transition-colors duration-300 ${activeSection === item.href.substring(1) ? "gradient-text" : "text-white/60 hover:text-white"}`}>{item.label}</motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
