
import { GoogleGenAI } from "@google/genai";

// Ensure the API_KEY is available in the environment variables
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    // In a real app, you might want to handle this more gracefully.
    // For this environment, we assume it's set.
    console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

// Helper to convert File to base64
const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const generateImageDescription = async (imageFile: File): Promise<string> => {
    if (!API_KEY) {
        // Fallback for when API key is not available
        return "AI analysis disabled. No API key.";
    }

    try {
        const imagePart = await fileToGenerativePart(imageFile);
        const textPart = { text: "Describe the main object in this image with 2-5 keywords for a lost and found search. Focus on color, object type, and any distinct features. Example: 'red leather wallet', 'blue kids backpack dinosaur', 'silver keys car remote'." };
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        return response.text.trim();
    } catch (error) {
        console.error("Error generating image description:", error);
        // Provide a user-friendly error message or a fallback
        if (error instanceof Error) {
            return `AI analysis failed: ${error.message}`;
        }
        return "AI analysis failed due to an unknown error.";
    }
};
