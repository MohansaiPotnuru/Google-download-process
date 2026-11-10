# Gemini API with Node.js – Setup & Quickstart

Notes and a minimal working example for calling Google's **Gemini API** from Node.js with the official [`@google/genai`](https://www.npmjs.com/package/@google/genai) SDK. The guide covers installing it, configuring credentials, and running the SDK's own sample collection.

## 1. Prerequisites

- **Node.js 18+** (`node --version`)
- A **Gemini API key** from [Google AI Studio](https://aistudio.google.com/apikey). Vertex AI users need a Google Cloud project instead; see section 4.

## 2. Quickstart (this repo)

```sh
git clone https://github.com/MohansaiPotnuru/Google-download-process.git
cd Google-download-process
npm install

export GEMINI_API_KEY="<your-key>"          # PowerShell: $env:GEMINI_API_KEY="<your-key>"
npm start -- "Explain how a UART works in two sentences"
```

[`generate_content.mjs`](generate_content.mjs) sends a single prompt and prints the text reply. Set `GEMINI_MODEL` to try a different model (the default is `gemini-2.5-flash`).

The whole API call is:

```js
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: "Hello, Gemini!",
});
console.log(response.text);
```

## 3. Running the official SDK samples

The SDK repository ships many more samples: streaming, chat, function calling, images, embeddings and more. They live in [googleapis/js-genai](https://github.com/googleapis/js-genai), **not** in this repo:

```sh
git clone https://github.com/googleapis/js-genai.git
cd js-genai

# Build the SDK
npm install
npm run build

# Build the samples
cd sdk-samples
npm install
npm run build

# Run one sample
node build/generate_content_with_text.js

# Or run them all, top to bottom (stops at the first failure)
bash run_samples.sh
```

On the first run, `run_samples.sh` writes the list of samples to `js_files_to_run.txt`. To skip a sample on later runs, delete its line from that file.

## 4. Environment variables

| Variable | Needed for | Example |
|---|---|---|
| `GEMINI_API_KEY` | Gemini Developer API (AI Studio key) | `AIza...` |
| `GOOGLE_CLOUD_PROJECT` | Vertex AI samples only | `my-gcp-project` |
| `GOOGLE_CLOUD_LOCATION` | Vertex AI samples only | `us-central1` |

```sh
export GEMINI_API_KEY=<GEMINI_KEY>
export GOOGLE_CLOUD_PROJECT=<GOOGLE_CLOUD_PROJECT>
export GOOGLE_CLOUD_LOCATION=<GCP_REGION>
```

> Keep API keys out of source control. Use environment variables or an untracked `.env` file. `.gitignore` already excludes `.env`.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `Set GEMINI_API_KEY first` | Export the variable in the same terminal you run `npm start` from |
| `API key not valid` (400) | Re-copy the key from AI Studio and check for stray spaces |
| `models/... is not found` (404) | That model name was retired or is unavailable in your region. Set `GEMINI_MODEL` to a current model |
| `SyntaxError: Cannot use import statement` | Use Node 18+; the sample is an ES module (`.mjs`) |

## References

- SDK source and samples: <https://github.com/googleapis/js-genai>
- Gemini API docs: <https://ai.google.dev/gemini-api/docs>
