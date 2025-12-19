
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string[];
  tools: string[];
  link: string;
  githubLink?: string;
  liveLink?: string;
  date: string;
  color: string;
  image?: string; // Path to project image (e.g., '/images/freeladesk.png')
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  location: string;
  details: string;
}

export interface Skill {
  name: string;
  category: 'Language' | 'Web' | 'DB' | 'Other';
  icon: string;
}

export interface Certification {
  provider: string;
  name: string;
}
