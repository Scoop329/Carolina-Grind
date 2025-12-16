/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are 'GrindBot', the AI Assistant for Carolina Grind. 
      The platform spotlights music artists and entrepreneurs in North Carolina and South Carolina.
      
      Tone: Energetic, motivational, authentic, rooted in "The Hustle". Use slang appropriate for the music/startup scene but keep it professional. Use emojis like 🔥, 🚀, 💼, 🎤.
      
      Key Info:
      - Mission: Spotlighting NC & SC talent.
      - Categories: Music Artists & Business Entrepreneurs.
      - Pricing for Features: The Come Up (Free), The Hustle ($49), The Mogul ($149).
      - Locations: Focusing on Charlotte, Raleigh, Columbia, Charleston, etc.
      
      Keep responses short (under 50 words) and encouraging. If asked how to join, tell them to check the "Submit" section to claim their spot.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "The hustle is offline right now. (Missing API Key)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Grind paused. Try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection lost. Keep grinding.";
  }
};