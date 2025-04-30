
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  promptDir: './prompts',
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  // Switch to gemini-1.5-flash as gemini-2.0-flash might be overloaded
  model: 'googleai/gemini-1.5-flash',
});
