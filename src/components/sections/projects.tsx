"use client"; // Add use client directive

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FiExternalLink } from 'react-icons/fi'; // Replace ExternalLink with FiExternalLink
import { useLanguage } from '@/context/language-context'; // Import useLanguage hook
import { cn } from '@/lib/utils';

// Define Project interface (can be moved to a types file)
export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
}


export function ProjectsSection() {
  const { content } = useLanguage(); // Use language context

  return (
    <section id="projects" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{content.projects.title}</h2> {/* Dynamic title */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.projects.items.map((project) => ( // Use dynamic project items
            <Card key={project.id} className="group flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"> {/* Add group class */}
              <CardHeader className="p-0 relative aspect-video"> {/* Added aspect ratio and relative positioning */}
                 <Image
                  src={project.imageUrl}
                  alt={`${project.title} screenshot`}
                  fill // Use fill to cover the container
                  className="object-cover" // Ensure image covers the area
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add sizes for optimization
                   data-ai-hint="project application"
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="text-xl font-semibold mb-2">{project.title}</CardTitle> {/* Dynamic project title */}
                <CardDescription>{project.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-4">
                 {project.liveUrl && (
                  <Button asChild variant="outline" size="sm"><a href={project.liveUrl} target="_blank" rel="noopener noreferrer"><span className="flex items-center gap-2">Live Demo <FiExternalLink className="h-4 w-4" /></span></a></Button>
                )}
                {project.repoUrl && (
                  <Button asChild variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"><a href={project.repoUrl} target="_blank" rel="noopener noreferrer"><span className="flex items-center gap-2">View Code <FiExternalLink className="h-4 w-4" /></span></a></Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
