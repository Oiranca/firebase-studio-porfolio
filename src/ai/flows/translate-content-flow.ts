
'use server';
/**
 * @fileOverview Translates the website's static content structure into a target language.
 *
 * - translateContent - A function that takes the content structure and translates it.
 * - TranslateContentInput - The input type (the content structure).
 * - TranslateContentOutput - The output type (the translated content structure).
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';
import type { ContentStructure } from '@/lib/content'; // Import the type, not the value

// Dynamically create Zod schema from the ContentStructure interface (simplified approach)
// Note: This is a basic representation. For complex nested structures with arrays of objects,
// a more robust schema generation or manual definition might be needed.
// For simplicity, we'll define the schema manually based on the expected structure.

// --- Define Schemas for nested objects ---
const NavLinkSchema = z.object({ name: z.string(), href: z.string() });
const HeroSchema = z.object({ name: z.string(), description: z.string(), profilePictureUrl: z.string().url() });
const AboutSchema = z.object({
  title: z.string(),
  introductionTitle: z.string(),
  introduction: z.string(),
  softSkillsTitle: z.string(),
  softSkills: z.array(z.string()),
});
const SkillsSchema = z.object({
    title: z.string(),
    frontendTitle: z.string(),
    frontendSkills: z.array(z.string()),
    backendTitle: z.string(),
    backendSkills: z.array(z.string()),
});
const ProjectSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    imageUrl: z.string().url(),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
});
const CollaborationSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    imageUrl: z.string().url(),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    team: z.array(z.string()).optional(),
});

// For Technology, we only translate the name. The icon remains the same.
const TechnologySchema = z.object({ name: z.string() /* Icon is component, not translatable data */ });

const FooterSchema = z.object({
    copyright: z.string(), // Placeholder will be replaced later
    // Social links are not translated here, just names/hrefs/icons
    socialLinks: z.array(z.object({ name: z.string(), href: z.string() /* Icon is component */ })),
});

const TranslationButtonSchema = z.object({
    toSpanish: z.string(),
    toEnglish: z.string(),
    loading: z.string(),
});


// --- Define the main Content Structure Schema ---
const ContentStructureSchema = z.object({
  navLinks: z.array(NavLinkSchema).describe("Navigation links. Translate only the 'name' field."),
  hero: HeroSchema.describe("Hero section content. Translate 'name' and 'description'."),
  about: AboutSchema.describe("About section content. Translate 'title', 'introductionTitle', 'introduction', 'softSkillsTitle', and each string in 'softSkills' array."),
  skills: SkillsSchema.describe("Skills section content. Translate 'title', 'frontendTitle', 'backendTitle', and each string in 'frontendSkills' and 'backendSkills' arrays."),
  projects: z.object({
      title: z.string(),
      items: z.array(ProjectSchema),
  }).describe("Projects section. Translate 'title' and the 'title', 'description' fields for each item in the 'items' array."),
  collaborations: z.object({
      title: z.string(),
      items: z.array(CollaborationSchema),
  }).describe("Collaborations section. Translate 'title' and the 'title', 'description', 'team' fields for each item in the 'items' array. Do not translate collaborator names if they are proper nouns."),
  technologies: z.object({
      title: z.string(),
      items: z.array(TechnologySchema), // Only translate 'name'
  }).describe("Technologies section. Translate 'title' and the 'name' field for each item."),
  footer: FooterSchema.describe("Footer content. Translate 'copyright' text, replacing {year} placeholder appropriately. Do not translate social link names if they are brand names."),
  translationButton: TranslationButtonSchema.describe("Translate button text. Translate 'toSpanish', 'toEnglish', and 'loading' fields."),
}).describe("The entire content structure of the portfolio website.");


// --- Input and Output Types ---
export type TranslateContentInput = ContentStructure; // Use the imported type directly
export type TranslateContentOutput = ContentStructure; // Output is the same structure, just translated

// --- Wrapper Function ---
export async function translateContent(input: TranslateContentInput): Promise<TranslateContentOutput> {
  // The Genkit flow handles the schema validation internally based on inputSchema/outputSchema
  return translateContentFlow(input);
}

// --- Genkit Prompt ---
const translatePrompt = ai.definePrompt({
  name: 'translatePortfolioContentPrompt',
  input: { schema: ContentStructureSchema },
  output: { schema: ContentStructureSchema },
  prompt: `Translate the following JSON content structure from English to Spanish.
Only translate the textual content (like titles, names, descriptions, skill names, button text, copyright text).
Do NOT translate URLs, IDs, brand names (like 'React', 'Next.js', 'GitHub'), or technical terms that are commonly used in English in the Spanish tech community (like 'Docker', 'Git').
Do NOT translate proper nouns like collaborator names if they appear in the 'team' field.
Keep the original JSON structure, including keys and array structures.
For the copyright field, keep the '{year}' placeholder intact.

Input Content (English):
\`\`\`json
{{{JSON.stringify input}}}
\`\`\`

Translate the values into Spanish, maintaining the exact same JSON structure.`,
});


// --- Genkit Flow ---
const translateContentFlow = ai.defineFlow<
  typeof ContentStructureSchema, // Input schema matches the prompt input
  typeof ContentStructureSchema  // Output schema matches the prompt output
>(
  {
    name: 'translateContentFlow',
    inputSchema: ContentStructureSchema,
    outputSchema: ContentStructureSchema,
  },
  async (content) => {
    console.log("Received content for translation:", JSON.stringify(content, null, 2));

    const { output } = await translatePrompt(content);

    if (!output) {
      throw new Error("Translation failed: No output received from the AI model.");
    }

    console.log("Received translation output:", JSON.stringify(output, null, 2));

    // Basic validation to ensure the structure seems intact (can be more robust)
    if (typeof output.hero?.name !== 'string' || !Array.isArray(output.navLinks)) {
        console.error("Translation output structure seems invalid:", output);
        throw new Error("Translation failed: Invalid structure received from the AI model.");
    }


    // --- Manual Correction/Refinement (Optional but Recommended) ---
    // Sometimes AI might miss nuances. Add corrections here if needed.
    // Example: Ensure brand names weren't translated accidentally.
    output.technologies.items = output.technologies.items.map((tech, index) => ({
        ...tech,
        name: content.technologies.items[index].name // Restore original name to avoid translation
    }));
     output.footer.socialLinks = output.footer.socialLinks.map((link, index) => ({
        ...link,
        name: content.footer.socialLinks[index].name // Restore original name
    }));
    // Make sure copyright year placeholder is correct
     if (!output.footer.copyright.includes('{year}')) {
       const originalCopyrightBase = content.footer.copyright.replace('{year}', '').trim();
       const translatedCopyrightBase = output.footer.copyright;
       // Attempt to reconstruct, might need adjustment based on AI output format
       if (translatedCopyrightBase.includes(originalCopyrightBase.substring(2))) { // Check if part of original text exists
         output.footer.copyright = translatedCopyrightBase.replace(originalCopyrightBase.substring(2), ' {year} ').trim() + " " + originalCopyrightBase.split(' ').pop();
       } else {
         // Fallback if reconstruction is hard, use original pattern with translated prefix/suffix
         const parts = translatedCopyrightBase.split(' ');
         output.footer.copyright = `${parts[0]} {year} ${parts.slice(1).join(' ')}`;
       }
       // Ensure it always has {year}
       if (!output.footer.copyright.includes('{year}')) {
            output.footer.copyright = content.footer.copyright; // Fallback to original if all fails
       }
    }


    // Assign back icons (they are not part of the translatable data)
    output.technologies.items.forEach((item, index) => {
        (item as any).icon = content.technologies.items[index].icon;
    });
    output.footer.socialLinks.forEach((item, index) => {
        (item as any).icon = content.footer.socialLinks[index].icon; // Correctly assign icon using the ContentStructure type definition
    });


    console.log("Final translated content:", JSON.stringify(output, null, 2));
    return output;
  }
);

// Ensure flow is registered for development inspection (requires './dev' import)
// This line might need adjustment based on how you run Genkit dev server
// Removed incorrect import: import './dev';
