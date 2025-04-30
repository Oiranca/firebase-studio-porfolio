
'use server';
/**
 * @fileOverview Translates the textual content of the website's structure into a target language.
 *
 * - translateContent - A server action that takes only the translatable text parts,
 *                      gets them translated by the AI flow, and returns the translated text structure.
 * - ContentStructure (imported type) - Represents the full website content including non-translatable parts.
 * - TranslatableContentInput - The type containing only the text fields to be sent for translation.
 * - TranslatableContentOutput - The type containing only the translated text fields returned by the flow.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';
import type { ContentStructure } from '@/lib/content'; // Import the type for reference if needed elsewhere
import { enContent } from '@/lib/content'; // Import the actual content for structure reference ONLY for non-flow logic like manual corrections


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
    title: z.string(),
    description: z.string(),
});
const TranslatableCollaborationSchema = z.object({
    title: z.string(),
    description: z.string(),
    team: z.array(z.string()).optional().describe("Translate only if not proper nouns"),
});

// For Technology, we only translate the name.
const TranslatableTechnologySchema = z.object({ name: z.string() });

const TranslatableFooterSchema = z.object({
    copyright: z.string().describe("Translate, keeping {year} placeholder"),
    // Only include name for translation, preserve href/icon later
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
      items: z.array(TranslatableTechnologySchema), // Only names need translation
  }),
  footer: TranslatableFooterSchema, // Only copyright and link names need translation
  translationButton: TranslatableTranslationButtonSchema,
}).describe("The textual content structure of the portfolio website to be translated.");


// --- Input and Output Types for the AI FLOW ---
export type TranslatableContentInput = z.infer<typeof TranslatableContentSchema>;
export type TranslatableContentOutput = z.infer<typeof TranslatableContentSchema>; // Output is the same structure, just translated


// --- EXPORTED Server Action ---
// This function is called by the client *with only the translatable data*.
// It orchestrates the translation flow call and returns the translated text structure.
export async function translateContent(input: TranslatableContentInput): Promise<TranslatableContentOutput> {
  console.log("Translatable content received by translateContent server action:", JSON.stringify(input, null, 2));

  try {
    // The Genkit flow handles the schema validation internally based on inputSchema/outputSchema
    const translatedTextData = await translateContentFlow(input);

     if (!translatedTextData || typeof translatedTextData.hero?.name !== 'string') {
        console.error("translateContent server action received invalid data from flow:", translatedTextData);
        throw new Error("Translation flow returned invalid data.");
     }

    console.log("Translated text data returned by server action:", JSON.stringify(translatedTextData, null, 2));
    return translatedTextData;
  } catch (error) {
    console.error("Error in translateContent server action:", error);
    // Re-throw the error so the client can catch it
    throw error;
  }
}


// --- Genkit Prompt ---
// Uses the TranslatableContentSchema for input and output.
const translatePrompt = ai.definePrompt({
  name: 'translatePortfolioContentPrompt',
  input: { schema: TranslatableContentSchema },
  output: { schema: TranslatableContentSchema },
  // Updated prompt for better clarity and JSON handling instructions
  prompt: `Translate the textual content of the following JSON object from English to Spanish.
  - Only translate the string values (e.g., "name", "description", "title", skill names, button text, copyright text).
  - Do NOT translate URLs, IDs, or technical terms commonly used in English within the Spanish tech community (e.g., 'React', 'Next.js', 'Docker', 'Git', 'JavaScript', 'CSS').
  - Do NOT translate proper nouns like collaborator names if they appear in the 'team' field, unless they have a common Spanish equivalent (unlikely).
  - For brand names used as technology names or social link names (e.g., 'GitHub', 'LinkedIn', 'Twitter', 'React', 'Node.js'), keep the original English name.
  - Maintain the exact original JSON structure, including all keys and array structures.
  - For the copyright field ('footer.copyright'), keep the '{year}' placeholder exactly as is within the translated string.
  - Respond ONLY with the translated JSON object, ensuring it conforms to the provided output schema.

  Input Content (English - Only Translatable Fields):
  \`\`\`json
  {{JSON.stringify input}}
  \`\`\`

  Translate the values into Spanish, maintaining the exact same JSON structure. Respond ONLY with the valid translated JSON object.`,
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

    try {
        const { output } = await translatePrompt(translatableContent);

        // DETAILED LOGGING: Log the raw output immediately after receiving it
        console.log("Raw translation output received from AI model:", JSON.stringify(output, null, 2));

        if (!output) {
          console.error("Translation failed: No output received from the AI model.");
          throw new Error("Translation failed: No output received from the AI model.");
        }

        // Basic validation (AI should adhere to output schema, but good to double-check)
        if (typeof output.hero?.name !== 'string' || !Array.isArray(output.navLinks)) {
            console.error("Translation output structure seems invalid:", output);
            throw new Error("Translation failed: Invalid structure received from the AI model.");
        }

        // --- Manual Correction/Refinement (Focus on AI quirks) ---
        // Ensure copyright year placeholder is correct (AI might replace it)
        if (output.footer && typeof output.footer.copyright === 'string' && !output.footer.copyright.includes('{year}')) {
            console.warn("AI potentially removed {year} placeholder in copyright. Attempting basic fix.");
            // Try a simple replacement logic. This is fragile and might need improvement.
            // Example: Replace any 4-digit number with '{year}' or append if no number found.
            output.footer.copyright = output.footer.copyright.replace(/\d{4}/, '{year}');
            if (!output.footer.copyright.includes('{year}')) {
                 // If still missing, append it (might not be grammatically perfect)
                output.footer.copyright += ' {year}';
                 console.warn("Appended {year} as a fallback fix.");
            }
        }

        console.log("Final processed translated text data being returned by flow:", JSON.stringify(output, null, 2));
        return output; // Return only the translated text data structure

    } catch(error) {
         console.error("Error during translatePrompt execution or processing:", error);
         // Rethrow the error to be caught by the calling server action
         throw error;
    }
  }
);

// Note: The dev import is removed as it caused issues and is typically not needed within the flow file itself.
// Genkit registration usually happens where flows are imported, like in `src/ai/dev.ts`.

    