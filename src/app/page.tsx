
import { HeroSection } from '@/components/sections/hero';
import { AboutSection } from '@/components/sections/about';
import { SkillsSection } from '@/components/sections/skills'; // Import the actual SkillsSection
import { ProjectsSection } from '@/components/sections/projects';
import { CollaborationsSection } from '@/components/sections/collaborations';
import { TechnologiesSection } from '@/components/sections/technologies';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection /> {/* Use the imported SkillsSection */}
      <ProjectsSection />
      <CollaborationsSection />
      <TechnologiesSection />
    </>
  );
}
