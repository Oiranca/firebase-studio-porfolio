
import * as React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

const socialLinks = [
  { name: "GitHub", href: "#", icon: Github },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Twitter", href: "#", icon: Twitter },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-6 mt-16 relative">
      {/* Container for vertical centering */}
      <div className="container mx-auto px-4 flex flex-col items-center justify-center h-full">
        <p className="text-sm mb-4">&copy; {new Date().getFullYear()} PersonaFlow. All rights reserved.</p>

        {/* Sticky Social Icons for Desktop (Positioned independently) */}
        <div className="hidden md:flex fixed bottom-4 left-4 flex-col gap-3 z-40">
           {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-background rounded-full shadow-md hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
              aria-label={link.name}
            >
              <link.icon className="h-5 w-5" />
            </Link>
          ))}
        </div>

         {/* Social Icons in Footer for Mobile (Now part of the centered flex column) */}
        <div className="md:hidden flex justify-center gap-4"> {/* Removed mt-4 as mb-4 on p handles spacing */}
          {socialLinks.map((link) => (
            <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">
              <link.icon className="h-6 w-6 text-muted-foreground hover:text-accent transition-colors" aria-label={link.name} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
