
"use client";

import * as React from 'react';
import { enContent, type ContentStructure } from '@/lib/content';
import { translateContent, type TranslateContentOutput } from '@/ai/flows/translate-content-flow';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  content: ContentStructure;
  isLoadingTranslation: boolean;
  toggleLanguage: () => void;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState<Language>('en');
  const [content, setContent] = React.useState<ContentStructure>(enContent);
  const [translatedContent, setTranslatedContent] = React.useState<TranslateContentOutput | null>(null);
  const [isLoadingTranslation, setIsLoadingTranslation] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const toggleLanguage = async () => {
    const targetLanguage = language === 'en' ? 'es' : 'en';

    if (targetLanguage === 'en') {
      setLanguage('en');
      setContent(enContent);
      setError(null); // Clear error when switching back to English
    } else {
      // If Spanish content already translated and cached, use it
      if (translatedContent) {
        setLanguage('es');
        setContent(translatedContent);
        setError(null);
      } else {
        setIsLoadingTranslation(true);
        setError(null); // Clear previous errors
        console.log("Requesting translation to Spanish...");
        try {
          const spanishContent = await translateContent(enContent);
          console.log("Translation successful:", spanishContent);
          setTranslatedContent(spanishContent); // Cache the translation
          setContent(spanishContent);
          setLanguage('es');
        } catch (err) {
           console.error("Translation error:", err);
           setError("Failed to translate content. Please try again.");
           // Optionally revert to English or show an error message
           // setLanguage('en');
           // setContent(enContent);
        } finally {
          setIsLoadingTranslation(false);
        }
      }
    }
  };

  // Display error message to user (e.g., using a toast)
  React.useEffect(() => {
    if (error) {
      // Replace with your preferred way to show errors, e.g., a toast notification
       alert(`Translation Error: ${error}`); // Simple alert for now
       // Example using useToast hook (if available globally or passed down)
       // toast({ title: "Translation Error", description: error, variant: "destructive" });
    }
  }, [error]);

  return (
    <LanguageContext.Provider value={{ language, content, isLoadingTranslation, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
