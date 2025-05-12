
"use client"


import Link from 'next/link';
import { FiMenu, FiMoon, FiSun } from 'react-icons/fi'; // Keep FiMoon, FiSun
import { GrLanguage } from 'react-icons/gr';
import { CgSpinner } from 'react-icons/cg';
import { cn } from '@/lib/utils';
import { useScrollDirection } from '@/hooks/use-scroll-direction';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useLanguage } from '@/context/language-context';
import { useTheme } from "next-themes"; // Import useTheme
import {cloneElement, useEffect, useState} from 'react';

export function Navbar() {
  const scrollDirection = useScrollDirection();
  const [isVisible, setIsVisible] = useState(true);
  const { language, content, isLoadingTranslation, toggleLanguage } = useLanguage();
  const { theme, setTheme } = useTheme(); // Use theme hook
  const [isMounted, setIsMounted] = useState(false); // State for hydration fix

  useEffect(() => {
    setIsMounted(true); // Set mounted state after initial render
  }, []);

  useEffect(() => {
    if (scrollDirection === "down") {
      setIsVisible(false);
    } else if (scrollDirection === "up") {
      setIsVisible(true);
    }
  }, [scrollDirection]);

  // Separate component for navigation content to avoid repetition
  const NavContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {content.navLinks.map((link) => {
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
          // Wrap LinkComponent with SheetClose when rendering for mobile
          <SheetClose key={link.name} asChild>
             {LinkComponent}
          </SheetClose>
        ) : (
          // Render Link directly for desktop
          cloneElement(LinkComponent, { key: link.name })
        );
      })}
    </>
  );


  const translationButtonText = language === 'es'
    ? content.translationButton.toEnglish
    : content.translationButton.toSpanish;

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Determine aria-label only after mount to avoid hydration mismatch
  const themeToggleButtonAriaLabel = isMounted
    ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`
    : "Toggle theme";


  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm shadow-sm transition-transform duration-300 ease-in-out border-b",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-around">
        {/* Theme Toggle Button */}
        <Button variant="ghost" size="sm" onClick={handleThemeToggle} aria-label={themeToggleButtonAriaLabel}>
           <div className="flex items-center justify-center w-5 mr-2">
             <FiSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
             <FiMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
           </div>
           <span className="dark:hidden">{content.themeButton.light}</span>
           <span className="hidden dark:inline">{content.themeButton.dark}</span>
        </Button>

        {/* Desktop Navigation - Centered */}
        <div className="hidden md:flex flex-grow justify-center items-center gap-6">
          <NavContent isMobile={false} />
        </div>

        {/* Buttons on the right */}
        <div className="hidden md:flex items-center gap-2">
          {/* Language Toggle */}
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

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2 ml-auto">
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

          {/* Theme Toggle - Mobile */}
          <Button variant="ghost" size="icon" onClick={handleThemeToggle} aria-label={themeToggleButtonAriaLabel}>
             <FiSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
             <FiMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
             <span className="sr-only dark:hidden">{content.themeButton.dark}</span>
             <span className="sr-only hidden dark:inline">{content.themeButton.light}</span>
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
                 <SheetTitle>Navigation</SheetTitle>
                 <SheetDescription>
                   Links to different sections of the portfolio.
                 </SheetDescription>
               </SheetHeader>
              <div className="flex flex-col items-stretch gap-4">
                <NavContent isMobile={true} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
