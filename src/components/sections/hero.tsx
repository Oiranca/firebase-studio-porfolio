
"use client"; // Add use client directive

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/language-context'; // Import useLanguage hook

export function HeroSection() {
  const { content } = useLanguage(); // Use language context

  return (
    <section id="hero" className="pt-24 pb-16 bg-background"> {/* Adjusted padding top */}
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <div className="mb-8">
           <Image
            src={content.hero.profilePictureUrl} // Use dynamic image URL
            alt="Avatar" // Changed from "My Profile Picture"
            width={200}
            height={200}
            className="rounded-full border-4 border-accent shadow-lg mx-auto"
            priority
            data-ai-hint="profile avatar" // Added AI hint
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{content.hero.name}</h1> {/* Use dynamic name */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {content.hero.description} {/* Use dynamic description */}
        </p>
      </div>
    </section>
  );
}
