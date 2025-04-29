
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Users } from 'lucide-react';

interface Collaboration {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  team?: string[]; // Optional: Names of collaborators
}

const sampleCollaborations: Collaboration[] = [
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
];

export function CollaborationsSection() {
  return (
    <section id="collaborations" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Collaborations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleCollaborations.map((collab) => (
            <Card key={collab.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                 <Image
                  src={collab.imageUrl}
                  alt={`${collab.title} screenshot`}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="text-xl font-semibold mb-2">{collab.title}</CardTitle>
                <CardDescription>{collab.description}</CardDescription>
                {collab.team && (
                  <div className="mt-3 text-sm text-muted-foreground flex items-center gap-2">
                     <Users className="h-4 w-4" />
                     <span>With: {collab.team.join(', ')}</span>
                  </div>
                 )}
              </CardContent>
              <CardFooter className="p-6 pt-0 flex gap-4">
                {collab.liveUrl && (
                  <Button asChild variant="outline" size="sm">
                    <a href={collab.liveUrl} target="_blank" rel="noopener noreferrer">
                      Live Demo <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
                 {collab.repoUrl && (
                  <Button asChild variant="secondary" size="sm">
                    <a href={collab.repoUrl} target="_blank" rel="noopener noreferrer">
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
