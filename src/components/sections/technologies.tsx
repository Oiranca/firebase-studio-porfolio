
import * as React from 'react';
import { Code, Database, Server, Cloud, Cog, Laptop } from 'lucide-react'; // Example icons
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Technology {
  name: string;
  icon: React.ElementType; // Use React.ElementType for component types
}

// Replace with your actual technologies and appropriate Lucide icons or custom SVGs
const technologies: Technology[] = [
  { name: "React", icon: Laptop }, // Example, find better icons if needed
  { name: "TypeScript", icon: Code },
  { name: "Node.js", icon: Server },
  { name: "Tailwind CSS", icon: Cog },
  { name: "PostgreSQL", icon: Database },
  { name: "Docker", icon: Cloud },
  { name: "Next.js", icon: Laptop }, // Reusing icon for example
  { name: "Git", icon: Code }, // Reusing icon
];

export function TechnologiesSection() {
  return (
    <section id="technologies" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Technologies I Use</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {technologies.map((tech) => (
            <Card key={tech.name} className="text-center shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center justify-center p-4 pb-2">
                <tech.icon className="h-10 w-10 mb-2 text-accent" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <CardTitle className="text-sm md:text-base font-medium">{tech.name}</CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
