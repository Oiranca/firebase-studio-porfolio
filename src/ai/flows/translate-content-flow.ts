
'use server';
/**
 * @fileOverview Translates the textual content of the website's structure into a target language.
 *
 * - translateContent - A function that takes the full content structure, extracts translatable text,
 *                      gets it translated by the AI flow, and returns the translated text structure.
 * - ContentStructure (imported type) - Represents the full website content including non-translatable parts.
 * - TranslatableContentInput - The type containing only the text fields to be sent for translation.
 * - TranslatableContentOutput - The type containing only the translated text fields returned by the flow.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';
import type { ContentStructure } from '@/lib/content'; // Import the type, not the value
import { enContent } from '@/lib/content'; // Import the actual content for structure reference


// --- Define Schemas for NESTED TRANSLATABLE objects ---
// These schemas only include the fields that need translation.

const TranslatableNavLinkSchema = z.object({ name: z.string() });
const TranslatableHeroSchema = z.object({ name: z.string(), description: z.string() });
const TranslatableAboutSchema = z.object({
  title: z.string(),
  introductionTitle: z.string(),
  introduction: z.string(),
  softSkillsTitle: z.string(),
  softSkills: z.array(z.string()),
});
const TranslatableSkillsSchema = z.object({
    title: z.string(),
    frontendTitle: z.string(),
    frontendSkills: z.array(z.string()),
    backendTitle: z.string(),
    backendSkills: z.array(z.string()),
});
const TranslatableProjectSchema = z.object({
    // id: z.number(), // Non-translatable
    title: z.string(),
    description: z.string(),
    // imageUrl: z.string().url(), // Non-translatable
    // liveUrl: z.string().url().optional(), // Non-translatable
    // repoUrl: z.string().url().optional(), // Non-translatable
});
const TranslatableCollaborationSchema = z.object({
    // id: z.number(), // Non-translatable
    title: z.string(),
    description: z.string(),
    // imageUrl: z.string().url(), // Non-translatable
    // liveUrl: z.string().url().optional(), // Non-translatable
    // repoUrl: z.string().url().optional(), // Non-translatable
    team: z.array(z.string()).optional().describe("Translate only if not proper nouns"),
});

// For Technology, we only translate the name.
const TranslatableTechnologySchema = z.object({ name: z.string() });

const TranslatableFooterSchema = z.object({
    copyright: z.string().describe("Translate, keeping {year} placeholder"),
    // Social links names might be brands, often not translated
    socialLinks: z.array(z.object({ name: z.string().describe("Translate only if not a brand name") })),
});

const TranslatableTranslationButtonSchema = z.object({
    toSpanish: z.string(),
    toEnglish: z.string(),
    loading: z.string(),
});


// --- Define the main TRANSLATABLE Content Structure Schema ---
// This schema only includes the parts of the content that need translation.
const TranslatableContentSchema = z.object({
  navLinks: z.array(TranslatableNavLinkSchema),
  hero: TranslatableHeroSchema,
  about: TranslatableAboutSchema,
  skills: TranslatableSkillsSchema,
  projects: z.object({
      title: z.string(),
      items: z.array(TranslatableProjectSchema),
  }),
  collaborations: z.object({
      title: z.string(),
      items: z.array(TranslatableCollaborationSchema),
  }),
  technologies: z.object({
      title: z.string(),
      items: z.array(TranslatableTechnologySchema),
  }),
  footer: TranslatableFooterSchema,
  translationButton: TranslatableTranslationButtonSchema,
}).describe("The textual content structure of the portfolio website to be translated.");


// --- Input and Output Types for the AI FLOW ---
export type TranslatableContentInput = z.infer<typeof TranslatableContentSchema>;
export type TranslatableContentOutput = z.infer<typeof TranslatableContentSchema>; // Output is the same structure, just translated


// --- Helper Function to Extract Translatable Data ---
// This function takes the full ContentStructure and returns an object
// matching the TranslatableContentSchema.
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


// --- EXPORTED Wrapper Function ---
// This function is called by the client. It orchestrates the extraction,
// translation flow call, and returns only the translated text structure.
export async function translateContent(input: ContentStructure): Promise<TranslatableContentOutput> {
  console.log("Original full content received by translateContent wrapper:", JSON.stringify(input, null, 2));
  const translatableData = extractTranslatableData(input);
  console.log("Extracted translatable data:", JSON.stringify(translatableData, null, 2));

  // The Genkit flow handles the schema validation internally based on inputSchema/outputSchema
  const translatedTextData = await translateContentFlow(translatableData);

  console.log("Translated text data received:", JSON.stringify(translatedTextData, null, 2));
  return translatedTextData;
}


// --- Genkit Prompt ---
// Uses the TranslatableContentSchema for input and output.
const translatePrompt = ai.definePrompt({
  name: 'translatePortfolioContentPrompt',
  input: { schema: TranslatableContentSchema },
  output: { schema: TranslatableContentSchema },
  prompt: `Translate the following JSON content structure from English to Spanish.
Only translate the textual content provided (like titles, names, descriptions, skill names, button text, copyright text).
Do NOT translate URLs, IDs, brand names (like 'React', 'Next.js', 'GitHub'), or technical terms that are commonly used in English in the Spanish tech community (like 'Docker', 'Git').
Do NOT translate proper nouns like collaborator names if they appear in the 'team' field.
Keep the original JSON structure, including keys and array structures.
For the copyright field, keep the '{year}' placeholder intact.

Input Content (English - Only Translatable Fields):
\`\`\`json
{{{JSON.stringify input}}}
\`\`\`

Translate the values into Spanish, maintaining the exact same JSON structure. Respond ONLY with the translated JSON object.`,
});


// --- Genkit Flow ---
// Takes only translatable data, returns only translated data.
const translateContentFlow = ai.defineFlow<
  typeof TranslatableContentSchema, // Input is only translatable text
  typeof TranslatableContentSchema  // Output is only translated text
>(
  {
    name: 'translateContentFlow',
    inputSchema: TranslatableContentSchema,
    outputSchema: TranslatableContentSchema,
  },
  async (translatableContent) => {
    console.log("Translatable content received by flow:", JSON.stringify(translatableContent, null, 2));

    const { output } = await translatePrompt(translatableContent);

    if (!output) {
      throw new Error("Translation failed: No output received from the AI model.");
    }

    console.log("Raw translation output from AI:", JSON.stringify(output, null, 2));

    // Basic validation (optional, AI should adhere to output schema)
    if (typeof output.hero?.name !== 'string' || !Array.isArray(output.navLinks)) {
        console.error("Translation output structure seems invalid:", output);
        throw new Error("Translation failed: Invalid structure received from the AI model.");
    }

     // --- Manual Correction/Refinement (Focus on AI quirks) ---
     // Ensure copyright year placeholder is correct (AI might replace it)
     if (!output.footer.copyright.includes('{year}')) {
        // Attempt to put {year} back if missing. This logic might need adjustment
        // depending on how the AI translates the copyright string.
        // A simple approach: find the likely year position or use original structure.
        const originalCopyright = enContent.footer.copyright; // Use original as reference
        const yearPlaceholder = '{year}';
        // Try a basic reconstruction based on original word count before/after {year}
        const originalParts = originalCopyright.split(yearPlaceholder);
        if (originalParts.length === 2) {
             // This assumes AI translates parts before/after {year} somewhat recognizably
             // A more robust solution might involve identifying the number 4 digits etc.
             // For now, let's try a simple placeholder replacement if the AI removed it.
             // This might fail if the translation significantly restructures the sentence.
             // Fallback: Just use the translated string as is, or revert to original pattern.
             console.warn("AI potentially removed {year} placeholder. Attempting to fix, but manual check recommended.");
             // A safer fallback might be to just ensure *a* year placeholder exists, even if not perfectly placed:
             if (!/\d{4}/.test(output.footer.copyright)) { // If no 4-digit number is present
                output.footer.copyright = output.footer.copyright.replace(/(\d{4}|$)/, ` ${yearPlaceholder} `).trim();
             }
             // If still no placeholder, revert to original structure with translated parts
             if (!output.footer.copyright.includes(yearPlaceholder)) {
                output.footer.copyright = `${output.footer.copyright.split(' ')[0]} ${yearPlaceholder} ${output.footer.copyright.split(' ').slice(1).join(' ')}`;
             }
        } else {
             console.warn("Could not reliably fix missing {year} placeholder in copyright.");
             // Fallback: Use original structure pattern if unsure
              if (!output.footer.copyright.includes(yearPlaceholder)) {
                 output.footer.copyright = originalCopyright; // Safest fallback
              }
        }

     }


    console.log("Final processed translated text data:", JSON.stringify(output, null, 2));
    return output; // Return only the translated text data structure
  }
);
