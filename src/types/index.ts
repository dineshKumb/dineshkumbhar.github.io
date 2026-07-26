export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: string[];
  githubUrl?: string;
  liveUrl?: string;
  layer: "bronze" | "silver" | "gold";
  gradient: string;
}

export interface Skill {
  name: string;
  category: "platform" | "language" | "architecture" | "tool";
  icon: string;
  description: string;
  proficiency: number;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
  layer: "bronze" | "silver" | "gold";
}
