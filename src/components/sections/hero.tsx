
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function HeroSection() {
  return (
    <section id="hero" className="pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <div className="mb-8">
           <Image
            src="https://picsum.photos/200/200" // Placeholder image
            alt="My Profile Picture"
            width={200}
            height={200}
            className="rounded-full border-4 border-accent shadow-lg mx-auto"
            priority // Load image eagerly as it's above the fold
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Your Name Here</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          A brief, engaging personal description goes here. Mention your main role or passion,
          e.g., "Passionate Full-Stack Developer creating innovative web solutions."
        </p>
      </div>
    </section>
  );
}
