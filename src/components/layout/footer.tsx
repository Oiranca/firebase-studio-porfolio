
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
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} PersonaFlow. All rights reserved.</p>

        {/* Sticky Social Icons for Desktop */}
        <div className="hidden md:flex fixed bottom-4 left-4 flex-col gap-3 z-40"> {/* Changed right-4 to left-4 */}
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

         {/* Social Icons in Footer for Mobile */}
        <div className="md:hidden flex justify-center gap-4 mt-4">
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
