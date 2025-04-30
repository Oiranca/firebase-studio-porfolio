
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
      <SkillsSection /> {/* Add this line */}
      <ProjectsSection />
      <CollaborationsSection />
      <TechnologiesSection />
    </>
  );
}

// Add SkillsSection component (can be similar to Technologies or About)
function SkillsSection() {
  // Define your skills here
  const technicalSkills = ["JavaScript (ES6+)", "React", "Next.js", "Node.js", "Express", "SQL (PostgreSQL)", "NoSQL (MongoDB)", "HTML5", "CSS3/Sass", "Tailwind CSS", "Docker", "Git/GitHub"];
  // Removed designSkills array

  return (
    <section id="skills" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
        {/* Updated grid layout to center the single card */}
        <div className="grid grid-cols-1 md:max-w-xl mx-auto">
          <div className="bg-background p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-center text-primary">Technical Skills</h3>
            <ul className="flex flex-wrap gap-2 justify-center">
              {technicalSkills.map((skill) => (
                <li key={skill} className="bg-accent text-accent-foreground text-sm font-medium px-3 py-1 rounded-full shadow">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
          {/* Removed the Design & Tools card */}
        </div>
      </div>
    </section>
  );
}
