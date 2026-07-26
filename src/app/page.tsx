"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";
import LoadingScreen from "@/components/LoadingScreen";

const ThreeCanvas = dynamic(() => import("@/components/ThreeCanvas"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-navy-900 z-0" />,
});

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 2,
      });

      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time: number) => { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
      (window as any).lenis = lenis;
    };
    initLenis();

    // Hide loading screen
    const timer = setTimeout(() => {
      const ls = document.querySelector(".loading-screen");
      if (ls) ls.classList.add("hidden");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen />
      <div className="canvas-container z-0"><ThreeCanvas /></div>
      <ScrollProgress />
      <Navigation />
      <main ref={mainRef} className="relative z-10" style={{ overflow: "hidden" }}>
        <section id="hero"><Hero /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="experience"><Experience /></section>
        <section id="contact"><Contact /></section>
        <footer className="relative py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="section-divider mb-8" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-small text-white/40">
                  © {new Date().getFullYear()} Dinesh Kumbhar. Crafted with passion for data.
              </p>
              <div className="flex items-center gap-6">
                <a href="https://www.linkedin.com/in/dineshk030799/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-electric transition-colors duration-300 text-sm">LinkedIn</a>
                <a href="https://github.com/dineshKumb" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-electric transition-colors duration-300 text-sm">GitHub</a>
                <a href="mailto:dineshkumbhar806@gmail.com" className="text-white/40 hover:text-electric transition-colors duration-300 text-sm">Email</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
