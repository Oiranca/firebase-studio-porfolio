
"use client"; // Add use client directive

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FiExternalLink, FiUsers } from 'react-icons/fi'; // Replace ExternalLink, Users
import { useLanguage } from '@/context/language-context'; // Import useLanguage hook

// Define Collaboration interface (can be moved to a types file)
export interface Collaboration {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  team?: string[];
}


export function CollaborationsSection() {
  const { content } = useLanguage(); // Use language context

  return (
    <section id="collaborations" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{content.collaborations.title}</h2> {/* Dynamic title */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.collaborations.items.map((collab) => ( // Use dynamic collaboration items
            <Card key={collab.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
               <CardHeader className="p-0 relative aspect-video"> {/* Added aspect ratio and relative positioning */}
                 <Image
                  src={collab.imageUrl}
                  alt={`${collab.title} screenshot`}
                  fill // Use fill to cover the container
                  className="object-cover" // Ensure image covers the area
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Add sizes for optimization
                  data-ai-hint="collaboration project"
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="text-xl font-semibold mb-2">{collab.title}</CardTitle> {/* Dynamic collab title */}
                <CardDescription>{collab.description}</CardDescription> {/* Dynamic collab description */}
                {collab.team && (
                  <div className="mt-3 text-sm text-muted-foreground flex items-center gap-2">
                     <FiUsers className="h-4 w-4" />
                     {/* Use dynamic team members, join if array exists */}
                     <span>With: {Array.isArray(collab.team) ? collab.team.join(', ') : ''}</span>
                  </div>
                 )}
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-4">
                {collab.liveUrl && (
                  <Button asChild variant="outline" size="sm">
                    <a href={collab.liveUrl} target="_blank" rel="noopener noreferrer">
                      Live Demo <FiExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
                 {collab.repoUrl && (
                  <Button asChild variant="secondary" size="sm">
                    <a href={collab.repoUrl} target="_blank" rel="noopener noreferrer">
                       View Code <FiExternalLink className="ml-2 h-4 w-4" />
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

