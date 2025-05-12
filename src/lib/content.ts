import type {Technology} from '@/components/sections/technologies'; // Assuming type is exported
import type {Project} from '@/components/sections/projects'; // Assuming type is exported
import type {Collaboration} from '@/components/sections/collaborations'; // Assuming type is exported
import {FaGitAlt, FaGithub, FaHtml5, FaLinkedin, FaNode, FaReact, FaTwitter} from 'react-icons/fa'; // Keep FaReact, FaDocker, FaGitAlt
import {SiCss3, SiJavascript, SiMongodb, SiPostgresql, SiTailwindcss, SiTypescript} from 'react-icons/si';
import {StaticImageData} from "next/image"; // Use SiNodedotjs instead of FaNodeJs
import Avatar from '../assets/avatar/Avatar.webp'


// Define the structure for all static content
export interface ContentStructure {
    themeButton: {
        light: string;
        dark: string;
    };
    navLinks: { name: string; href: string }[];
    hero: {
        name: string;
        description: string;
        profilePictureUrl: StaticImageData;
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
/*export const enContent: ContentStructure = {
    themeButton: {
        light: "Light Mode",
        dark: "Dark Mode",
    },
    navLinks: [
        {name: "About", href: "#about"},
        {name: "Skills", href: "#skills"},
        {name: "Projects", href: "#projects"},
        {name: "Collaborations", href: "#collaborations"},
        {name: "Technologies", href: "#technologies"},
    ],
    hero: {
        name: "Your Name Here",
        description: "Passionate Full-Stack Developer creating innovative web solutions.",
        profilePictureUrl: Avatar, // Use placeholder image
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
            {name: "JavaScript", icon: SiJavascript},
            {name: "HTML5", icon: FaHtml5},
            {name: "CSS", icon: SiCss3},
            {name: "React", icon: FaReact},
            {name: "TypeScript", icon: SiTypescript},
            {name: "Node.js", icon: FaNode},
            {name: "Tailwind CSS", icon: SiTailwindcss},
            {name: "PostgreSQL", icon: SiPostgresql},
            {name: "MongoDB", icon: SiMongodb},
            {name: "Git", icon: FaGitAlt},
        ]
    },
    footer: {
        copyright: "© {year} PersonaFlow. All rights reserved.",
        socialLinks: [
            {name: "GitHub", href: "#", icon: FaGithub},
            {name: "LinkedIn", href: "#", icon: FaLinkedin},
            {name: "Twitter", href: "#", icon: FaTwitter}, // Using FaTwitter
        ]
    },
    translationButton: {
        toSpanish: "View in Spanish",
        toEnglish: "View in English",
        loading: "Translating...",
    }
};
*/
// Define Spanish content
export const esContent: ContentStructure = {
    themeButton: {
        light: "Modo Claro",
        dark: "Modo Oscuro",
    },
    navLinks: [
        {name: "Sobre Mí", href: "#about"},
        {name: "Habilidades", href: "#skills"},
        {name: "Proyectos", href: "#projects"},
        {name: "Colaboraciones", href: "#collaborations"},
        {name: "Tecnologías", href: "#technologies"},
    ],
    hero: {
        name: "Tu Nombre Aquí",
        description: "Desarrollador Full-Stack apasionado creando soluciones web innovadoras.",
        profilePictureUrl: Avatar, // Use placeholder image
    },
    about: {
        title: "Sobre Mí",
        introductionTitle: "Introducción / Extracto de Carta de Presentación",
        introduction: "Impulsado por la pasión de crear experiencias de usuario fluidas y sistemas backend robustos, prospero en entornos colaborativos donde puedo contribuir a proyectos impactantes. Estoy ansioso por aprovechar mis habilidades en tecnologías web modernas para construir aplicaciones eficientes y escalables.",
        softSkillsTitle: "Habilidades Blandas",
        softSkills: ["Comunicación Efectiva", "Resolución de Problemas", "Colaboración en Equipo", "Adaptabilidad", "Gestión del Tiempo", "Creatividad"],
    },
    skills: {
        title: "Habilidades Técnicas",
        frontendTitle: "Frontend",
        frontendSkills: ["JavaScript (ES6+)", "React", "Next.js", "HTML5", "CSS3/Sass", "Tailwind CSS"],
        backendTitle: "Backend",
        backendSkills: ["Node.js", "Express", "SQL (PostgreSQL)", "NoSQL (MongoDB)", "Docker", "Git/GitHub"],
    },
    projects: {
        title: "Proyectos Personales",
        items: [
            {
                id: 1,
                title: "Proyecto Alpha",
                description: "Una descripción del Proyecto Alpha, destacando sus características principales y las tecnologías utilizadas.",
                imageUrl: "https://picsum.photos/400/250?random=1",
                liveUrl: "#",
                repoUrl: "#",
            },
            {
                id: 2,
                title: "Proyecto Beta",
                description: "Detalles sobre el Proyecto Beta, enfocándose en el problema que resuelve y el proceso de desarrollo.",
                imageUrl: "https://picsum.photos/400/250?random=2",
                liveUrl: "#",
                repoUrl: "#",
            },
            {
                id: 3,
                title: "Proyecto Gamma",
                description: "Una visión general del Proyecto Gamma, explicando su propósito e implementación técnica.",
                imageUrl: "https://picsum.photos/400/250?random=3",
                liveUrl: "#",
            },
        ]
    },
    collaborations: {
        title: "Colaboraciones",
        items: [
            {
                id: 1,
                title: "Iniciativa Colaborativa X",
                description: "Un esfuerzo conjunto en la Iniciativa X, mostrando trabajo en equipo y objetivos compartidos.",
                imageUrl: "https://picsum.photos/400/250?random=4",
                liveUrl: "#",
                team: ["Colaborador 1", "Colaborador 2"],
            },
            {
                id: 2,
                title: "Proyecto en Equipo Y",
                description: "Desarrollado el Proyecto Y con un equipo, enfocándose en la integración y comunicación.",
                imageUrl: "https://picsum.photos/400/250?random=5",
                repoUrl: "#",
                team: ["Otro Desarrollador", "Diseñador"],
            },
            {
                id: 3,
                title: "Contribución de Código Abierto Z",
                description: "Contribución al proyecto de código abierto Z, mejorando características específicas.",
                imageUrl: "https://picsum.photos/400/250?random=6",
                repoUrl: "#",
            },
        ]
    },
    technologies: {
        title: "Tecnologías que Utilizo",
        items: [
            {name: "JavaScript", icon: SiJavascript},
            {name: "HTML5", icon: FaHtml5},
            {name: "CSS", icon: SiCss3},
            {name: "React", icon: FaReact},
            {name: "TypeScript", icon: SiTypescript},
            {name: "Node.js", icon: FaNode},
            {name: "Tailwind CSS", icon: SiTailwindcss},
            {name: "PostgreSQL", icon: SiPostgresql},
            {name: "MongoDB", icon: SiMongodb},
            {name: "Git", icon: FaGitAlt},
        ]
    },
    footer: {
        copyright: "© {year} PersonaFlow. Todos los derechos reservados.",
        socialLinks: [
            {name: "GitHub", href: "#", icon: FaGithub},
            {name: "LinkedIn", href: "#", icon: FaLinkedin},
            {name: "Twitter", href: "#", icon: FaTwitter},
        ]
    },
    translationButton: {
        toSpanish: "Ver en Español",
        toEnglish: "Ver en Inglés",
        loading: "Traduciendo...",
    }
};

