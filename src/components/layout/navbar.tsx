
"use client"

import * as React from 'react';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi'; // Replace Menu
import { GrLanguage } from 'react-icons/gr'; // Replace Languages
import { CgSpinner } from 'react-icons/cg'; // Replace Loader2
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
               isMobile && "block py-2 text-lg w-full text-center hover:bg-accent/10 rounded" // Added hover bg for mobile
             )}
            >
             {link.name}
           </Link>
         );


         return isMobile ? (
            // Wrap SheetClose around the Link for mobile to close the sheet on navigation
             // Ensure SheetClose is only used when the Sheet is open
             <SheetClose key={link.name} asChild>
                 {LinkComponent}
             </SheetClose>
         ) : (
            // Render Link directly for desktop
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
      <div className="container mx-auto px-4 py-3 flex items-center justify-between"> {/* Added justify-between */}
        <Link href="/" className="text-lg font-bold text-primary hover:text-accent transition-colors">
          PersonaFlow
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex flex-grow justify-center items-center gap-6"> {/* Added flex-grow and justify-center */}
          <NavContent isMobile={false} />
        </div>

        {/* Buttons on the right */}
        <div className="hidden md:flex items-center gap-2"> {/* Wrapper for buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            disabled={isLoadingTranslation}
            aria-label={isLoadingTranslation ? content.translationButton.loading : translationButtonText}
          >
            {isLoadingTranslation ? (
              <CgSpinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GrLanguage className="mr-2 h-4 w-4" />
            )}
            {isLoadingTranslation ? content.translationButton.loading : translationButtonText}
          </Button>
        </div>

        {/* Mobile Navigation - Remains aligned to the right */}
        <div className="md:hidden flex items-center gap-2 ml-auto"> {/* Added ml-auto to push mobile controls right */}
           {/* Translation Toggle Button - Mobile (Icon Only) */}
           <Button
             variant="ghost"
             size="icon"
             onClick={toggleLanguage}
             disabled={isLoadingTranslation}
             aria-label={isLoadingTranslation ? content.translationButton.loading : translationButtonText}
           >
             {isLoadingTranslation ? (
                <CgSpinner className="h-5 w-5 animate-spin" />
             ) : (
                <GrLanguage className="h-5 w-5" />
             )}
             <span className="sr-only">{isLoadingTranslation ? content.translationButton.loading : translationButtonText}</span>
           </Button>
           {/* Mobile Menu Trigger */}
           <Sheet>
             <SheetTrigger asChild>
               <Button variant="ghost" size="icon">
                 <FiMenu className="h-6 w-6" />
                 <span className="sr-only">Toggle menu</span>
               </Button>
             </SheetTrigger>
             <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-background p-6">
                <SheetHeader className="mb-6 text-left">
                 {/* Added SheetTitle for accessibility */}
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>
                    Links to different sections of the portfolio.
                  </SheetDescription>
                </SheetHeader>
               <div className="flex flex-col items-stretch gap-4"> {/* Changed items-center to items-stretch */}
                 <NavContent isMobile={true} />
               </div>
             </SheetContent>
           </Sheet>
        </div>
      </div>
    </nav>
  );
}

