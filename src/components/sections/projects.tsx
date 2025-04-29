
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
}

const sampleProjects: Project[] = [
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
    repoUrl: "#",
  },
    {
    id: 3,
    title: "Project Gamma",
    description: "An overview of Project Gamma, explaining its purpose and technical implementation.",
    imageUrl: "https://picsum.photos/400/250?random=3",
    liveUrl: "#",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Personal Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleProjects.map((project) => (
            <Card key={project.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                 <Image
                  src={project.imageUrl}
                  alt={`${project.title} screenshot`}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="text-xl font-semibold mb-2">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-4">
                 {project.liveUrl && (
                  <Button asChild variant="outline" size="sm">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button asChild variant="secondary" size="sm">
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                       View Code <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
