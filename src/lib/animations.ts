import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const LAYER_COLORS = {
  bronze: {
    primary: "#CD7F32",
    secondary: "#E8A862",
    accent: "#8B5A2B",
    glow: "rgba(205, 127, 50, 0.6)",
    bg: "#0A0E27",
  },
  silver: {
    primary: "#C0C0C0",
    secondary: "#E8E8E8",
    accent: "#8A8A8A",
    glow: "rgba(192, 192, 192, 0.6)",
    bg: "#0F1436",
  },
  gold: {
    primary: "#FFD700",
    secondary: "#FFE44D",
    accent: "#B8960F",
    glow: "rgba(255, 215, 0, 0.6)",
    bg: "#161D4A",
  },
};

export const EASING = {
  smooth: "power3.inOut",
  strong: "power4.inOut",
  in: "power3.in",
  out: "power3.out",
  inOut: "power2.inOut",
  overshoot: "back.out(1.7)",
  elastic: "elastic.out(1, 0.5)",
};

export const STAGGER = {
  cards: 0.1,
  items: 0.08,
  text: 0.05,
  fast: 0.03,
  slow: 0.15,
};

export function createStaggerReveal(
  selector: string,
  options: Partial<gsap.TweenVars> = {}
): gsap.Tween {
  return gsap.from(selector, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: STAGGER.items,
    ease: EASING.smooth,
    scrollTrigger: {
      trigger: selector,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
    ...options,
  });
}

export function createTextReveal(
  selector: string,
  options: Partial<gsap.TweenVars> = {}
): gsap.Tween {
  return gsap.from(selector, {
    opacity: 0,
    y: 60,
    rotateX: -15,
    filter: "blur(10px)",
    duration: 1.2,
    ease: EASING.smooth,
    scrollTrigger: {
      trigger: selector,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    ...options,
  });
}
