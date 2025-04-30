
"use client"

import * as React from 'react';
import Link from 'next/link';
import { Menu, Languages, Loader2 } from 'lucide-react'; // Added Languages and Loader2 icons
import { cn } from '@/lib/utils';
import { useScrollDirection } from '@/hooks/use-scroll-direction';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useLanguage } from '@/context/language-context'; // Import useLanguage hook

export function Navbar() {
  const scrollDirection = useScrollDirection();
  const [isVisible, setIsVisible] = React.useState(true);
  const { language, content, isLoadingTranslation, toggleLanguage } = useLanguage(); // Use language context

  React.useEffect(() => {
    if (scrollDirection === "down") {
      setIsVisible(false);
    } else if (scrollDirection === "up") {
      setIsVisible(true);
    }
  }, [scrollDirection]);

  // Separate component for navigation content to avoid repetition
  const NavContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {content.navLinks.map((link) => { // Use dynamic content
        const LinkComponent = (
          <Link
            href={link.href}
            className={cn(
              "text-sm font-medium text-foreground hover:text-accent transition-colors",
              isMobile && "block py-2 text-lg w-full text-center"
            )}
          >
            {link.name}
          </Link>
        );

        return isMobile ? (
          <SheetClose key={link.name} asChild>
            {React.cloneElement(LinkComponent, { key: undefined })}
          </SheetClose>
        ) : (
          React.cloneElement(LinkComponent, { key: link.name })
        );
      })}
    </>
  );

  const translationButtonText = language === 'en'
    ? content.translationButton.toSpanish
    : content.translationButton.toEnglish;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm shadow-sm transition-transform duration-300 ease-in-out border-b", // Slightly increased opacity and added border
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
          {/* Translation Toggle Button - Desktop */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            disabled={isLoadingTranslation}
            aria-label={isLoadingTranslation ? content.translationButton.loading : translationButtonText}
          >
            {isLoadingTranslation ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Languages className="mr-2 h-4 w-4" />
            )}
            {isLoadingTranslation ? content.translationButton.loading : translationButtonText}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2"> {/* Added gap for mobile */}
           {/* Translation Toggle Button - Mobile (Icon Only) */}
           <Button
             variant="ghost"
             size="icon"
             onClick={toggleLanguage}
             disabled={isLoadingTranslation}
             aria-label={isLoadingTranslation ? content.translationButton.loading : translationButtonText}
           >
             {isLoadingTranslation ? (
                <Loader2 className="h-5 w-5 animate-spin" />
             ) : (
                <Languages className="h-5 w-5" />
             )}
             <span className="sr-only">{isLoadingTranslation ? content.translationButton.loading : translationButtonText}</span>
           </Button>
           {/* Mobile Menu Trigger */}
           <Sheet>
             <SheetTrigger asChild>
               <Button variant="ghost" size="icon">
                 <Menu className="h-6 w-6" />
                 <span className="sr-only">Toggle menu</span>
               </Button>
             </SheetTrigger>
             <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-background p-6">
               <SheetHeader className="mb-6 text-left">
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>
                     Links to different sections of the portfolio.
                  </SheetDescription>
               </SheetHeader>
               <div className="flex flex-col items-center gap-4">
                 <NavContent isMobile={true} />
               </div>
             </SheetContent>
           </Sheet>
        </div>
      </div>
    </nav>
  );
}
