import { GoogleGenAI, Type } from '@google/genai';
import { Level, Category, WritingPrompt, WritingFeedback } from '../types';

function getApiKey(): string {
  const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing VITE_GEMINI_API_KEY');
  }

  return apiKey;
}

export async function generatePrompt(level: Level, category: Category): Promise<WritingPrompt> {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  const systemInstruction = `You are an expert German language teacher. Your task is to generate a writing prompt for a student learning German.
The student's level is ${level} (CEFR) and the writing category is "${category}".
Ensure the topic is realistic, engaging, and covers diverse domains (e.g., daily life, work, travel, technology, culture, etc.).
The prompt MUST be entirely in German, except for the JSON structure keys which are in English.
Provide clear instructions, a suggested word count appropriate for the level, and specific points the student must cover.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a writing prompt for level ${level} and category ${category}.`,
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: 'A catchy title for the writing task in German' },
          description: { type: Type.STRING, description: 'A brief description of the scenario or context in German' },
          instructions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'Clear writing instructions in German'
          },
          suggestedWordCount: { type: Type.INTEGER, description: 'Suggested number of words' },
          pointsToCover: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'Specific points the student must include in their text, in German'
          }
        },
        required: ['title', 'description', 'instructions', 'suggestedWordCount', 'pointsToCover']
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error('Failed to generate prompt');
  return JSON.parse(text) as WritingPrompt;
}

export async function analyzeText(level: Level, category: Category, prompt: WritingPrompt, userText: string): Promise<WritingFeedback> {
  const ai = new GoogleGenAI({ apiKey: getApiKey() });
  const systemInstruction = `You are an expert German language teacher and examiner.
Analyze the student's text based on the provided prompt, their target level (${level}), and the category (${category}).
Provide a highly detailed, pedagogical, and structured correction.
Be encouraging but strict on grammar, vocabulary, and style.
The feedback should be primarily in English to help the learner understand the explanations, but all German examples, corrections, and versions must be in flawless, natural German.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `
Prompt Details:
Title: ${prompt.title}
Description: ${prompt.description}
Instructions: ${prompt.instructions.join(' ')}
Points to cover: ${prompt.pointsToCover.join(', ')}

Student's Text:
${userText}

Analyze this text and provide detailed feedback in JSON format.`,
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          correctedText: { type: Type.STRING, description: "The student's text with minimal corrections to make it grammatically correct while keeping their original voice." },
          betterVersion: { type: Type.STRING, description: "A significantly improved version of the text, using better vocabulary and sentence structures appropriate for the target level." },
          nativeSpeakerVersion: { type: Type.STRING, description: "How a native German speaker would naturally write this text." },
          estimatedLevel: { type: Type.STRING, description: "The estimated CEFR level of the student's text (e.g., A1.2, A2.1, B1)." },
          scores: {
            type: Type.OBJECT,
            properties: {
              grammar: { type: Type.INTEGER, description: "Score out of 10" },
              vocabulary: { type: Type.INTEGER, description: "Score out of 10" },
              coherence: { type: Type.INTEGER, description: "Score out of 10" },
              taskCompletion: { type: Type.INTEGER, description: "Score out of 10" },
              style: { type: Type.INTEGER, description: "Score out of 10" }
            },
            required: ["grammar", "vocabulary", "coherence", "taskCompletion", "style"]
          },
          mistakes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                original: { type: Type.STRING, description: "The exact incorrect phrase/word from the student's text" },
                correction: { type: Type.STRING, description: "The corrected phrase/word" },
                explanation: { type: Type.STRING, description: "Detailed explanation of why it is wrong and how to fix it (in English)" },
                type: { type: Type.STRING, description: "Must be one of: grammar, spelling, vocabulary, style, sentence structure" }
              },
              required: ["original", "correction", "explanation", "type"]
            }
          },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of things the student did well (in English)" },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of areas needing improvement (in English)" },
          adviceToImprove: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Actionable advice for the student (in English)" },
          vocabularyToReuse: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                word: { type: Type.STRING, description: "A useful German word/phrase related to the topic" },
                translation: { type: Type.STRING, description: "English translation" },
                example: { type: Type.STRING, description: "Example sentence in German" }
              },
              required: ["word", "translation", "example"]
            }
          },
          grammarPointsToReview: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific grammar topics the student should study based on their mistakes (in English)" }
        },
        required: [
          "correctedText", "betterVersion", "nativeSpeakerVersion", "estimatedLevel",
          "scores", "mistakes", "strengths", "weaknesses", "adviceToImprove",
          "vocabularyToReuse", "grammarPointsToReview"
        ]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error('Failed to analyze text');
  return JSON.parse(text) as WritingFeedback;
}
