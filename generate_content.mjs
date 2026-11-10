// Minimal Gemini API call with the official @google/genai SDK.
//
//   export GEMINI_API_KEY=...            # from https://aistudio.google.com/apikey
//   npm install && npm start -- "Explain UART in one paragraph"
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Set GEMINI_API_KEY first (see README).");
  process.exit(1);
}

const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
const prompt = process.argv.slice(2).join(" ") || "Write a haiku about embedded systems.";

const ai = new GoogleGenAI({ apiKey });

try {
  const response = await ai.models.generateContent({ model, contents: prompt });
  console.log(response.text);
} catch (err) {
  console.error(`Request failed (${model}):`, err.message ?? err);
  process.exit(1);
}
