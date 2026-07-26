# Data Lake Odyssey — Portfolio Website

A cinematic, Apple-style portfolio website for **Dinesh Kumbhar** — Data Engineer.

## Getting Started

```bash
cd "Portfolio Website/portfolio-website"
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 15 (App Router)
- TypeScript, Tailwind CSS
- React Three Fiber + @react-three/drei (3D)
- GSAP + ScrollTrigger (scroll animations)
- Framer Motion (UI animations)
- Lenis (smooth scrolling)

## Structure

```
portfolio-website/
├── src/app/          # Next.js pages & layout
├── src/components/   # All UI components
├── src/lib/          # GSAP & animation utilities
├── src/types/        # TypeScript types
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## Features

- 3D bronze→silver→gold transformation on scroll
- Mouse-reactive parallax
- 3D tilt cards on hover
- Smooth scroll with Lenis
- Fully responsive

Built with ❤️ by Dinesh Kumbhar
