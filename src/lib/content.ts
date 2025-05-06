
import type { Technology } from '@/components/sections/technologies'; // Assuming type is exported
import type { Project } from '@/components/sections/projects'; // Assuming type is exported
import type { Collaboration } from '@/components/sections/collaborations'; // Assuming type is exported
import { FaGithub, FaLinkedin, FaTwitter, FaReact, FaDocker, FaGitAlt, FaNode } from 'react-icons/fa'; // Keep FaReact, FaDocker, FaGitAlt
import { SiTypescript, SiTailwindcss, SiPostgresql, SiNextdotjs } from 'react-icons/si'; // Use SiNodedotjs instead of FaNodeJs



// Define the structure for all static content
export interface ContentStructure {
  navLinks: { name: string; href: string }[];
  hero: {
    name: string;
    description: string;
    profilePictureUrl: string;
  };
  about: {
    title: string;
    introductionTitle: string;
    introduction: string;
    softSkillsTitle: string;
    softSkills: string[];
  };
  skills: {
    title: string;
    frontendTitle: string;
    frontendSkills: string[];
    backendTitle: string;
    backendSkills: string[];
  };
  projects: {
    title: string;
    items: Project[]; // Reuse Project type if structure matches
  };
  collaborations: {
    title: string;
    items: Collaboration[]; // Reuse Collaboration type if structure matches
  };
  technologies: {
    title: string;
    items: Technology[]; // Reuse Technology type if structure matches
  };
  footer: {
    copyright: string;
    socialLinks: { name: string; href: string; icon: React.ElementType }[];
  };
  translationButton: {
    toSpanish: string;
    toEnglish: string;
    loading: string;
  };
}


// Define English content
export const enContent: ContentStructure = {
  navLinks: [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Collaborations", href: "#collaborations" },
    { name: "Technologies", href: "#technologies" },
  ],
  hero: {
    name: "Your Name Here",
    description: "Passionate Full-Stack Developer creating innovative web solutions.",
    profilePictureUrl: "https://picsum.photos/200/200", // Use placeholder image
  },
  about: {
    title: "About Me",
    introductionTitle: "Introduction / Cover Letter Snippet",
    introduction: "Driven by a passion for crafting seamless user experiences and robust backend systems, I thrive in collaborative environments where I can contribute to impactful projects. I am eager to leverage my skills in modern web technologies to build efficient and scalable applications.",
    softSkillsTitle: "Soft Skills",
    softSkills: ["Effective Communication", "Problem Solving", "Team Collaboration", "Adaptability", "Time Management", "Creativity"],
  },
  skills: {
    title: "Technical Skills",
    frontendTitle: "Frontend",
    frontendSkills: ["JavaScript (ES6+)", "React", "Next.js", "HTML5", "CSS3/Sass", "Tailwind CSS"],
    backendTitle: "Backend",
    backendSkills: ["Node.js", "Express", "SQL (PostgreSQL)", "NoSQL (MongoDB)", "Docker", "Git/GitHub"],
  },
  projects: {
    title: "Personal Projects",
    items: [
      {
        id: 1,
        title: "Project Alpha",
        description: "A description of Project Alpha, highlighting its key features and the technologies used.",
        imageUrl: "https://picsum.photos/400/250?random=1",
        liveUrl: "#",
        repoUrl: "#",
      },
      {
        id: 2,
        title: "Project Beta",
        description: "Details about Project Beta, focusing on the problem it solves and the development process.",
        imageUrl: "https://picsum.photos/400/250?random=2",
        liveUrl: "#",
        repoUrl: "#",
      },
      {
        id: 3,
        title: "Project Gamma",
        description: "An overview of Project Gamma, explaining its purpose and technical implementation.",
        imageUrl: "https://picsum.photos/400/250?random=3",
        liveUrl: "#",
      },
    ]
  },
  collaborations: {
    title: "Collaborations",
    items: [
      {
        id: 1,
        title: "Collaborative Initiative X",
        description: "A joint effort on Initiative X, showcasing teamwork and shared goals.",
        imageUrl: "https://picsum.photos/400/250?random=4",
        liveUrl: "#",
        team: ["Collaborator 1", "Collaborator 2"],
      },
      {
        id: 2,
        title: "Team Project Y",
        description: "Developed Project Y with a team, focusing on integration and communication.",
        imageUrl: "https://picsum.photos/400/250?random=5",
        repoUrl: "#",
        team: ["Another Dev", "Designer"],
      },
      {
        id: 3,
        title: "Open Source Contribution Z",
        description: "Contributed to the open-source project Z, improving specific features.",
        imageUrl: "https://picsum.photos/400/250?random=6",
        repoUrl: "#",
      },
    ]
  },
  technologies: {
    title: "Technologies I Use",
    items: [
      { name: "React", icon: FaReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Node.js", icon: FaNode }, // Changed icon here
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Docker", icon: FaDocker },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Git", icon: FaGitAlt },
    ]
  },
  footer: {
    copyright: "© {year} PersonaFlow. All rights reserved.",
    socialLinks: [
      { name: "GitHub", href: "#", icon: FaGithub },
      { name: "LinkedIn", href: "#", icon: FaLinkedin },
      { name: "Twitter", href: "#", icon: FaTwitter }, // Using FaTwitter
    ]
  },
  translationButton: {
    toSpanish: "Translate to Spanish",
    toEnglish: "View in English",
    loading: "Translating...",
  }
};

