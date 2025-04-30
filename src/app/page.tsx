
import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { ProjectsSection } from '@/components/sections/projects';
import { CollaborationsSection } from '@/components/sections/collaborations';
import { TechnologiesSection } from '@/components/sections/technologies';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection /> {/* Updated Skills Section */}
      <ProjectsSection />
      <CollaborationsSection />
      <TechnologiesSection />
    </>
  );
}

// Updated SkillsSection component with Frontend/Backend categories
function SkillsSection() {
  // Define frontend and backend skills
  const frontendSkills = ["JavaScript (ES6+)", "React", "Next.js", "HTML5", "CSS3/Sass", "Tailwind CSS"];
  const backendSkills = ["Node.js", "Express", "SQL (PostgreSQL)", "NoSQL (MongoDB)", "Docker", "Git/GitHub"];

  return (
    <section id="skills" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
        {/* Grid layout for Frontend and Backend cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Frontend Skills Card */}
          <div className="bg-background p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center text-primary">Frontend</h3>
            <ul className="flex flex-wrap gap-2 justify-center">
              {frontendSkills.map((skill) => (
                <li key={skill} className="bg-accent text-accent-foreground text-sm font-medium px-3 py-1 rounded-full shadow">
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Backend Skills Card */}
          <div className="bg-background p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center text-primary">Backend</h3>
            <ul className="flex flex-wrap gap-2 justify-center">
              {backendSkills.map((skill) => (
                <li key={skill} className="bg-accent text-accent-foreground text-sm font-medium px-3 py-1 rounded-full shadow">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
