import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/three/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bronze: {
          DEFAULT: "#CD7F32",
          light: "#E8A862",
          dark: "#8B5A2B",
          glow: "rgba(205, 127, 50, 0.6)",
        },
        silver: {
          DEFAULT: "#C0C0C0",
          light: "#E8E8E8",
          dark: "#8A8A8A",
          glow: "rgba(192, 192, 192, 0.6)",
        },
        gold: {
          DEFAULT: "#FFD700",
          light: "#FFE44D",
          dark: "#B8960F",
          glow: "rgba(255, 215, 0, 0.6)",
        },
        navy: {
          900: "#0A0E27",
          800: "#0F1436",
          700: "#161D4A",
          600: "#1E2760",
          500: "#263080",
        },
        electric: {
          DEFAULT: "#00D4FF",
          light: "#33E0FF",
          dark: "#0099CC",
          glow: "rgba(0, 212, 255, 0.5)",
        },
        surface: {
          900: "#060818",
          800: "#0B0F24",
          700: "#111633",
          600: "#181E45",
          500: "#1F2655",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "spin-reverse": "spin 25s linear infinite reverse",
        "particle-drift": "particleDrift 15s linear infinite",
        "data-flow": "dataFlow 2s linear infinite",
        "shimmer": "shimmer 2s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        particleDrift: {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(100px, -50px)" },
          "50%": { transform: "translate(50px, -100px)" },
          "75%": { transform: "translate(-50px, -50px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        dataFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        "electric": "0 0 30px rgba(0, 212, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.1)",
        "gold": "0 0 30px rgba(255, 215, 0, 0.3), 0 0 60px rgba(255, 215, 0, 0.1)",
        "bronze": "0 0 30px rgba(205, 127, 50, 0.3), 0 0 60px rgba(205, 127, 50, 0.1)",
        "inner-glow": "inset 0 0 30px rgba(0, 212, 255, 0.1)",
      },
      backgroundSize: {
        "400%": "400% 400%",
      },
    },
  },
  plugins: [],
};

export default config;
