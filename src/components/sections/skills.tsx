
"use client";

import * as React from 'react';
import { useLanguage } from '@/context/language-context'; // Import useLanguage hook
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Assuming Card components are used

export function SkillsSection() {
  const { content } = useLanguage(); // Use language context

  return (
    <section id="skills" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{content.skills.title}</h2> {/* Dynamic title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"> {/* Increased gap */}

          {/* Frontend Skills Card */}
          <Card className="shadow-md">
             <CardHeader>
                 <CardTitle className="text-xl font-semibold mb-4 text-center text-primary">{content.skills.frontendTitle}</CardTitle> {/* Dynamic frontend title */}
             </CardHeader>
             <CardContent>
                <ul className="flex flex-wrap gap-2 justify-center">
                  {content.skills.frontendSkills.map((skill) => ( // Dynamic frontend skills
                    <li key={skill} className="bg-accent text-accent-foreground text-sm font-medium px-3 py-1 rounded-full shadow">
                      {skill}
                    </li>
                  ))}
                </ul>
             </CardContent>
          </Card>


          {/* Backend Skills Card */}
           <Card className="shadow-md">
             <CardHeader>
                <CardTitle className="text-xl font-semibold mb-4 text-center text-primary">{content.skills.backendTitle}</CardTitle> {/* Dynamic backend title */}
             </CardHeader>
             <CardContent>
                <ul className="flex flex-wrap gap-2 justify-center">
                    {content.skills.backendSkills.map((skill) => ( // Dynamic backend skills
                    <li key={skill} className="bg-accent text-accent-foreground text-sm font-medium px-3 py-1 rounded-full shadow">
                        {skill}
                    </li>
                    ))}
                </ul>
              </CardContent>
           </Card>

        </div>
      </div>
    </section>
  );
}
