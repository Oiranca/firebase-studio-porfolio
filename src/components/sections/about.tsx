
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function AboutSection() {
  return (
    <section id="about" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center mb-4">About Me</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Introduction / Cover Letter Snippet</h3>
              <p>
                Write a short introductory statement here. This could be a snippet from your cover letter
                or a brief overview of your career goals and what drives you. Focus on enthusiasm and
                key strengths. For example: "Driven by a passion for crafting seamless user experiences
                and robust backend systems, I thrive in collaborative environments where I can contribute
                to impactful projects..."
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Soft Skills</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Effective Communication</li>
                <li>Problem Solving</li>
                <li>Team Collaboration</li>
                <li>Adaptability</li>
                <li>Time Management</li>
                {/* Add more relevant soft skills */}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
