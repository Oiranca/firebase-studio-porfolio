
"use client"; // Add use client directive

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context'; // Import useLanguage hook

// Define Technology interface (can be moved to a types file)
export interface Technology {
  name: string;
  icon: React.ElementType;
}


export function TechnologiesSection() {
  const { content } = useLanguage(); // Use language context

  return (
    <section id="technologies" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{content.technologies.title}</h2> {/* Dynamic title */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {content.technologies.items.map((tech) => ( // Use dynamic technology items
            <Card key={tech.name} className="text-center shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center justify-center p-4 pb-2">
                {/* Render the icon component directly */}
                 {/* Use a div wrapper for consistent sizing if needed */}
                 <div className="flex justify-center items-center h-10 w-10 mb-2">
                    <tech.icon className="h-full w-full text-accent" aria-hidden="true" />
                 </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {/* Use CardTitle for semantic heading but style as needed */}
                <CardTitle className="text-sm md:text-base font-medium">{tech.name}</CardTitle> {/* Dynamic tech name */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

