
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



// --- Define Schemas for NESTED TRANSLATABLE objects ---
// These schemas only include the fields that need translation.

const TranslatableNavLinkSchema = z.object({ name: z.string() });
const TranslatableHeroSchema = z.object({ name: z.string(), description: z.string() });
const TranslatableAboutSchema = z.object({
  title: z.string(),
  // introductionTitle: z.string(),
  introduction: z.string(),
  // softSkillsTitle: z.string(),
  // softSkills: z.array(z.string()),
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

const TranslatableThemeButtonSchema = z.object({
    light: z.string(),
    dark: z.string(),
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
  themeButton: TranslatableThemeButtonSchema,
}).describe("The textual content structure of the portfolio website to be translated.");


// --- Input and Output Types for the AI FLOW ---
export type TranslatableContentInput = z.infer<typeof TranslatableContentSchema>;
export type TranslatableContentOutput = z.infer<typeof TranslatableContentSchema>; // Output is the same structure, just translated


// --- EXPORTED Server Action ---
// This function is called by the client *with only the translatable data*.
// It orchestrates the translation flow call and returns the translated text structure.
export async function translateContent(input: TranslatableContentInput): Promise<TranslatableContentOutput> {
  try {
    // The Genkit flow handles the schema validation internally based on inputSchema/outputSchema
    const translatedTextData = await translateContentFlow(input);

     if (!translatedTextData || typeof translatedTextData.hero?.name !== 'string') {
        throw new Error("Translation flow returned invalid data.");
     }

    return translatedTextData;
  } catch (error) {
    // Re-throw the error so the client can catch it
    throw error;
  }
}


// --- Genkit Prompt ---
// Input schema is a simple object with the stringified JSON.
// Output schema is the TranslatableContentSchema (the structure we want back).
const translatePrompt = ai.definePrompt({
  name: 'translatePortfolioContentPrompt',
  input: {
    schema: z.object({
      jsonInputString: z.string().describe("The JSON string representation of the content to be translated.")
    })
  },
  output: { schema: TranslatableContentSchema },
  // Updated prompt for better clarity and JSON handling instructions
  prompt: `Translate the textual content of the following JSON object from Spanish to English.
  - Only translate the string values (e.g., "name", "description", "title", skill names, button text, copyright text).
  - Do NOT translate URLs, IDs, or technical terms commonly used in English within the Spanish tech community (e.g., 'React', 'Next.js', 'Docker', 'Git', 'JavaScript', 'CSS').
  - Do NOT translate proper nouns like collaborator names if they appear in the 'team' field, unless they have a common Spanish equivalent (unlikely).
  - For brand names used as technology names or social link names (e.g., 'GitHub', 'LinkedIn', 'Twitter', 'React', 'Node.js'), keep the original English name.
  - Maintain the exact original JSON structure, including all keys and array structures.
  - For the copyright field ('footer.copyright'), keep the '{year}' placeholder exactly as is within the translated string.
  - Respond ONLY with the translated JSON object, ensuring it conforms to the provided output schema.

  Input Content (Spanish - Only Translatable Fields):
  \`\`\`json
  {{{jsonInputString}}}
  \`\`\`

  Translate the values into English, maintaining the exact same JSON structure. Respond ONLY with the valid translated JSON object.`,
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
    try {
        // Stringify the input for the prompt
        const jsonInputString = JSON.stringify(translatableContent);

        // Call the prompt with the stringified input
        const { output } = await translatePrompt({ jsonInputString });

        if (!output) {
          throw new Error("Translation failed: No output received from the AI model.");
        }

        // Basic validation (AI should adhere to output schema, but good to double-check)
        if (typeof output.hero?.name !== 'string' || !Array.isArray(output.navLinks)) {
            throw new Error("Translation failed: Invalid structure received from the AI model.");
        }

        // --- Manual Correction/Refinement (Focus on AI quirks) ---
        // Ensure copyright year placeholder is correct (AI might replace it)
        if (output.footer && !output.footer.copyright.includes('{year}')) {
            // Try a simple replacement logic. This is fragile and might need improvement.
            // Example: Replace any 4-digit number with '{year}' or append if no number found.
            output.footer.copyright = output.footer.copyright.replace(/\d{4}/, '{year}');
            if (!output.footer.copyright.includes('{year}')) {
                 // If still missing, append it (might not be grammatically perfect)
                output.footer.copyright += ' {year}';
            }
        }

        return output; // Return only the translated text data structure

    } catch(error) {
         // Rethrow the error to be caught by the calling server action
         throw error;
    }
  }
);

// Note: The dev import is removed as it caused issues and is typically not needed within the flow file itself.
// Genkit registration usually happens where flows are imported, like in `src/ai/dev.ts`.


