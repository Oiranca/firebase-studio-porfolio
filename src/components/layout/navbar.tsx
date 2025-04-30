
"use client"

import * as React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollDirection } from '@/hooks/use-scroll-direction';
import { Button } from '@/components/ui/button';
// Removed DialogTitle from this import as it doesn't exist in sheet.tsx
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Collaborations", href: "#collaborations" },
  { name: "Technologies", href: "#technologies" },
];

export function Navbar() {
  const scrollDirection = useScrollDirection();
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (scrollDirection === "down") {
      setIsVisible(false);
    } else if (scrollDirection === "up") {
      setIsVisible(true);
    }
    // On initial load or if scrollDirection is null, keep it visible
  }, [scrollDirection]);

  // Separate component for navigation content to avoid repetition
  const NavContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {navLinks.map((link) => {
        const LinkComponent = (
          <Link
            href={link.href}
            className={cn(
              "text-sm font-medium text-foreground hover:text-accent transition-colors",
              isMobile && "block py-2 text-lg w-full text-center" // Center text for mobile links
            )}
          >
             {link.name}
          </Link>
        );

        // Only wrap with SheetClose if it's mobile
        return isMobile ? (
          <SheetClose key={link.name} asChild>
             {/* Pass the Link component as the child */}
             {React.cloneElement(LinkComponent, { key: undefined })}
          </SheetClose>
        ) : (
          // Render the Link directly for desktop, adding the key here
          React.cloneElement(LinkComponent, { key: link.name })
        );
      })}
    </>
  );


  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm shadow-sm transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-lg font-bold text-primary hover:text-accent transition-colors">
          PersonaFlow
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavContent isMobile={false} />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
             {/* SheetContent provides the context for SheetClose */}
             <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-background p-6">
               {/* Use SheetTitle instead of DialogTitle, and make it sr-only */}
               <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
               <SheetHeader className="mb-6 text-left">
                 <SheetDescription>
                    Links to different sections of the portfolio.
                 </SheetDescription>
               </SheetHeader>
               <div className="flex flex-col items-center gap-4">
                 {/* Render NavContent inside the SheetContent */}
                 <NavContent isMobile={true} />
               </div>
            </SheetContent>
           </Sheet>
        </div>
      </div>
    </nav>
  );
}
