import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

gsap.config({
  nullTargetWarn: false,
  autoSleep: 60,
});

export const easings = {
  smooth: "power3.inOut",
  strong: "power4.inOut",
  snap: "elastic.out(1, 0.5)",
  overshoot: "back.out(1.7)",
  inOut: "power2.inOut",
  in: "power3.in",
  out: "power3.out",
};

export { gsap, ScrollTrigger };
export default gsap;
