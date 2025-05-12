
"use client"; // Add use client directive

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context'; // Import useLanguage hook

export function AboutSection() {
  const { content } = useLanguage(); // Use language context

  return (
    <section id="about" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center mb-4">{content.about.title}</CardTitle> {/* Dynamic title */}
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <div>
              <p>
                {content.about.introduction} {/* Dynamic introduction */}
              </p>
            </div>
          {/*  <div>*/}
          {/*    <h3 className="text-xl font-semibold mb-2 text-foreground">{content.about.softSkillsTitle}</h3> /!* Dynamic skills title *!/*/}
          {/*    <ul className="list-disc list-inside space-y-1">*/}
          {/*      {content.about.softSkills.map((skill) => ( // Dynamic skills list*/}
          {/*        <li key={skill}>{skill}</li>*/}
          {/*      ))}*/}
          {/*    </ul>*/}
          {/*  </div>*/}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
