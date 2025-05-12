
"use client";

import * as React from 'react';
import { esContent, type ContentStructure } from '@/lib/content';
import { translateContent, type TranslatableContentInput, type TranslatableContentOutput } from '@/ai/flows/translate-content-flow';
import { produce } from 'immer'; // Using Immer for easier immutable updates
import { useToast } from '@/hooks/use-toast'; // Import useToast for better error feedback

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  content: ContentStructure;
  isLoadingTranslation: boolean;
  toggleLanguage: () => void;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);


// --- Helper Function to Extract Translatable Data ---
// This function takes the full ContentStructure and returns an object
// matching the TranslatableContentSchema.
// THIS NOW RUNS ON THE CLIENT BEFORE CALLING THE SERVER ACTION.
function extractTranslatableData(fullContent: ContentStructure): TranslatableContentInput {
    // Ensure icons are not passed; only include translatable fields
    return {
        navLinks: fullContent.navLinks.map(link => ({ name: link.name })),
        hero: { name: fullContent.hero.name, description: fullContent.hero.description },
        about: {
            title: fullContent.about.title,
            // introductionTitle: fullContent.about.introductionTitle,
            introduction: fullContent.about.introduction,
            // softSkillsTitle: fullContent.about.softSkillsTitle,
            // softSkills: fullContent.about.softSkills,
        },
        skills: {
             title: fullContent.skills.title,
             frontendTitle: fullContent.skills.frontendTitle,
             frontendSkills: fullContent.skills.frontendSkills,
             backendTitle: fullContent.skills.backendTitle,
             backendSkills: fullContent.skills.backendSkills,
        },
        projects: {
            title: fullContent.projects.title,
            items: fullContent.projects.items.map(item => ({
                title: item.title,
                description: item.description,
            })),
        },
        collaborations: {
            title: fullContent.collaborations.title,
            items: fullContent.collaborations.items.map(item => ({
                title: item.title,
                description: item.description,
                team: item.team, // Keep team as it might contain translatable names (or not)
            })),
        },
        technologies: {
            title: fullContent.technologies.title,
            // Only include the name for translation, icons are handled separately
            items: fullContent.technologies.items.map(item => ({ name: item.name })),
        },
        footer: {
            copyright: fullContent.footer.copyright,
            // Only include the name for translation, href/icons are handled separately
            socialLinks: fullContent.footer.socialLinks.map(link => ({ name: link.name })),
        },
        translationButton: { ...fullContent.translationButton },
        themeButton: { ...fullContent.themeButton }
    };
}


// Helper function to merge translated text back into the full structure
// This function takes the *original* English structure and the *translated text object*
// It returns the *full* Spanish structure, preserving non-translatable fields like IDs, URLs, and icons.
function mergeTranslatedText(
    originalContent: ContentStructure, // Always merge onto the original English base
    translatedText: TranslatableContentOutput
): ContentStructure {
    // Use Immer for safe and easy immutable updates based on the original English content
    return produce(originalContent, draft => {
        // Nav Links
        translatedText.navLinks.forEach((link, index) => {
            if (draft.navLinks[index]) {
                draft.navLinks[index].name = link.name;
            }
        });

        // Hero
        draft.hero.name = translatedText.hero.name;
        draft.hero.description = translatedText.hero.description;
        // profilePictureUrl is preserved from originalContent


        // About
        draft.about.title = translatedText.about.title;
        // draft.about.introductionTitle = translatedText.about.introductionTitle;
        draft.about.introduction = translatedText.about.introduction;
        // draft.about.softSkillsTitle = translatedText.about.softSkillsTitle;
        // draft.about.softSkills = translatedText.about.softSkills;

        // Skills
        draft.skills.title = translatedText.skills.title;
        draft.skills.frontendTitle = translatedText.skills.frontendTitle;
        draft.skills.frontendSkills = translatedText.skills.frontendSkills;
        draft.skills.backendTitle = translatedText.skills.backendTitle;
        draft.skills.backendSkills = translatedText.skills.backendSkills;

        // Projects
        draft.projects.title = translatedText.projects.title;
        translatedText.projects.items.forEach((item, index) => {
            if (draft.projects.items[index]) {
                draft.projects.items[index].title = item.title;
                draft.projects.items[index].description = item.description;
                // id, imageUrl, liveUrl, repoUrl are preserved
            }
        });

        // Collaborations
        draft.collaborations.title = translatedText.collaborations.title;
        translatedText.collaborations.items.forEach((item, index) => {
            if (draft.collaborations.items[index]) {
                draft.collaborations.items[index].title = item.title;
                draft.collaborations.items[index].description = item.description;
                draft.collaborations.items[index].team = item.team; // Update potentially translated team names
                // id, imageUrl, liveUrl, repoUrl are preserved
            }
        });

        // Technologies
        draft.technologies.title = translatedText.technologies.title;
        translatedText.technologies.items.forEach((item, index) => {
            if (draft.technologies.items[index]) {
                draft.technologies.items[index].name = item.name;
                // Icons are preserved from the original draft
            }
        });

        // Footer
        draft.footer.copyright = translatedText.footer.copyright;
        translatedText.footer.socialLinks.forEach((link, index) => {
             if (draft.footer.socialLinks[index]) {
                draft.footer.socialLinks[index].name = link.name;
                 // Icons/hrefs are preserved
             }
        });

        // Translation Button
        draft.translationButton = translatedText.translationButton;
        
        // Theme Button
        if (translatedText.themeButton) {
            draft.themeButton = translatedText.themeButton;
        }
    });
}


export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState<Language>('es');
  const [content, setContent] = React.useState<ContentStructure>(esContent);
  // Cache the *fully merged* Spanish content structure
  const [mergedEnglishContent, setMergedEnglishContent] = React.useState<ContentStructure | null>(null);
  const [isLoadingTranslation, setIsLoadingTranslation] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast(); // Initialize toast hook

  const toggleLanguage = async () => {
    const targetLanguage = language === 'es' ? 'en' : 'es';

    if (targetLanguage === 'es') {
      setLanguage('es');
      setContent(esContent);
      setError(null); // Clear error when switching back to English
    } else { // Target language is 'es'
      // If fully merged Spanish content already cached, use it
      if (mergedEnglishContent) {
        setLanguage('es');
        setContent(mergedEnglishContent);
        setError(null);
      } else {
        // Need to fetch and merge translation
        setIsLoadingTranslation(true);
        setError(null); // Clear previous errors
        try {
          // 1. Extract only translatable data on the client from the *base English content*
          const translatableData = extractTranslatableData(esContent);

          // 2. Call the server action with ONLY the translatable data
          const translatedTextData: TranslatableContentOutput = await translateContent(translatableData);

          // Basic check if we received *something* that looks like the expected structure
           if (!translatedTextData || typeof translatedTextData.hero?.name !== 'string') {
               throw new Error("Received invalid translation data structure from the server.");
           }

          // 3. Merge the translated text back into the original English structure on the client
          const fullEnglishContent = mergeTranslatedText(esContent, translatedTextData);

          setMergedEnglishContent(fullEnglishContent); // Cache the fully merged structure
          setContent(fullEnglishContent); // <<<< CRITICAL: Set the active content state
          setLanguage('en'); // <<<< CRITICAL: Set the language state

                  } catch (err) {
           const errorMessage = err instanceof Error ? err.message : "Failed to translate content. Please try again.";
           setError(errorMessage);
           // Don't revert language here, let the error display handle it.
           // setLanguage('en');
           // setContent(esContent);
                  } finally {
          setIsLoadingTranslation(false);
        }
      }
    }
  };

  // Display error message to user using toast
  React.useEffect(() => {
    if (error) {
      toast({
        title: "Translation Error",
        description: error,
        variant: "destructive",
        duration: 5000, // Show error for 5 seconds
      });
       // It's important to clear the error after showing it,
       // otherwise it might reappear on subsequent renders without a new error occurring.
       // However, setting it immediately might cause issues if the toast relies on it.
       // A small delay or handling it within the toast's onOpenChange might be better,
       // but for simplicity, we clear it here. Consider potential race conditions.
       // Using a useEffect cleanup function might be safer if the toast component unmounts.
       const timer = setTimeout(() => setError(null), 100); // Clear error shortly after showing toast
       return () => clearTimeout(timer); // Cleanup timeout on unmount or if error changes again
    }
  }, [error, toast]); // Add toast to dependency array

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

