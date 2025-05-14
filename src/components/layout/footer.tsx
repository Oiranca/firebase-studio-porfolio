
"use client"; // Add use client directive

import * as React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/language-context'; // Import useLanguage hook

export function Footer() {
  const { content } = useLanguage(); // Use language context to get content
  const currentYear = new Date().getFullYear();
  const copyrightText = content.footer.copyright.replace('{year}', currentYear.toString());


  return (
    <footer className="bg-secondary text-secondary-foreground py-6 mt-16 relative"> {/* Changed mt-auto */}
      <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full">
        <p className="text-sm mb-4 text-center">{copyrightText}</p> {/* Use dynamic copyright */}

        {/* Sticky Social Icons for Desktop (Positioned independently) */}
         <div className="hidden md:flex fixed bottom-4 left-4 flex-col gap-3 z-40 items-center justify-center"> {/* Added items-center and justify-center */}
           {content.footer.socialLinks.map((link) => { // Use dynamic social links
            const IconComponent = link.icon; // Get the icon component from content
             return (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-primary text-primary-foreground rounded-full shadow-md hover:bg-accent hover:text-accent-foreground transition-colors duration-200" // Changed bg-background to bg-primary and added text-primary-foreground
                  aria-label={link.name}
                >
                   <IconComponent className="h-5 w-5" />
                </Link>
             );
          })}
        </div>

         {/* Social Icons in Footer for Mobile */}
        <div className="md:hidden flex justify-center gap-4 mt-4"> {/* Added mt-4 for spacing */}
          {content.footer.socialLinks.map((link) => { // Use dynamic social links
             const IconComponent = link.icon; // Get the icon component from content
            return (
                <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">
                  <IconComponent className="h-6 w-6 text-muted-foreground hover:text-accent transition-colors" aria-label={link.name} />
                </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}


