
"use client";

import * as React from 'react';
import { enContent, type ContentStructure } from '@/lib/content';
import { translateContent, type TranslatableContentInput, type TranslatableContentOutput } from '@/ai/flows/translate-content-flow';
import { produce } from 'immer'; // Using Immer for easier immutable updates

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
    return {
        navLinks: fullContent.navLinks.map(link => ({ name: link.name })),
        hero: { name: fullContent.hero.name, description: fullContent.hero.description },
        about: {
            title: fullContent.about.title,
            introductionTitle: fullContent.about.introductionTitle,
            introduction: fullContent.about.introduction,
            softSkillsTitle: fullContent.about.softSkillsTitle,
            softSkills: fullContent.about.softSkills,
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
                team: item.team,
            })),
        },
        technologies: {
            title: fullContent.technologies.title,
            items: fullContent.technologies.items.map(item => ({ name: item.name })),
        },
        footer: {
            copyright: fullContent.footer.copyright,
            socialLinks: fullContent.footer.socialLinks.map(link => ({ name: link.name })),
        },
        translationButton: { ...fullContent.translationButton }
    };
}


// Helper function to merge translated text back into the full structure
function mergeTranslatedText(
    originalContent: ContentStructure,
    translatedText: TranslatableContentOutput
): ContentStructure {
    // Use Immer for safe and easy immutable updates
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

        // About
        draft.about.title = translatedText.about.title;
        draft.about.introductionTitle = translatedText.about.introductionTitle;
        draft.about.introduction = translatedText.about.introduction;
        draft.about.softSkillsTitle = translatedText.about.softSkillsTitle;
        draft.about.softSkills = translatedText.about.softSkills;

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
            }
        });

        // Collaborations
        draft.collaborations.title = translatedText.collaborations.title;
        translatedText.collaborations.items.forEach((item, index) => {
            if (draft.collaborations.items[index]) {
                draft.collaborations.items[index].title = item.title;
                draft.collaborations.items[index].description = item.description;
                draft.collaborations.items[index].team = item.team;
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
    });
}


export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState<Language>('en');
  const [content, setContent] = React.useState<ContentStructure>(enContent);
  // Cache the *fully merged* Spanish content structure
  const [mergedSpanishContent, setMergedSpanishContent] = React.useState<ContentStructure | null>(null);
  const [isLoadingTranslation, setIsLoadingTranslation] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const toggleLanguage = async () => {
    const targetLanguage = language === 'en' ? 'es' : 'en';

    if (targetLanguage === 'en') {
      setLanguage('en');
      setContent(enContent);
      setError(null); // Clear error when switching back to English
    } else {
      // If fully merged Spanish content already cached, use it
      if (mergedSpanishContent) {
        setLanguage('es');
        setContent(mergedSpanishContent);
        setError(null);
      } else {
        setIsLoadingTranslation(true);
        setError(null); // Clear previous errors
        console.log("Requesting translation to Spanish...");
        try {
          // 1. Extract only translatable data on the client
          const translatableData = extractTranslatableData(enContent);
          console.log("Extracted translatable data on client:", JSON.stringify(translatableData, null, 2));

          // 2. Call the server action with ONLY the translatable data
          const translatedTextData: TranslatableContentOutput = await translateContent(translatableData);

          console.log("Translation successful (text only):", translatedTextData);

          // 3. Merge the translated text back into the original structure on the client
          const fullSpanishContent = mergeTranslatedText(enContent, translatedTextData);
          console.log("Merged full Spanish content on client:", fullSpanishContent);

          setMergedSpanishContent(fullSpanishContent); // Cache the fully merged structure
          setContent(fullSpanishContent); // Set the active content
          setLanguage('es');

        } catch (err) {
           console.error("Translation error:", err);
           setError(err instanceof Error ? err.message : "Failed to translate content. Please try again.");
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
       // import { useToast } from '@/hooks/use-toast';
       // const { toast } = useToast();
       // toast({ title: "Translation Error", description: error, variant: "destructive" });
       setError(null); // Clear error after showing
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
