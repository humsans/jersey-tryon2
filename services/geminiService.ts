
import { GoogleGenAI, Modality } from "@google/genai";
import { JerseyType } from '../types';
import { PREMIER_LEAGUE_TEAMS } from '../constants';

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a check for development time; in production, the key should be set.
  console.warn("API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateTryOnImage = async (
  base64ImageData: string,
  mimeType: string,
  teamName: string,
  jerseyType: JerseyType
): Promise<string> => {
  try {
    const team = PREMIER_LEAGUE_TEAMS.find(t => t.name === teamName);
    if (!team) {
      throw new Error(`Team ${teamName} not found.`);
    }

    const jerseyDescription = team.jerseys[jerseyType];
    const prompt = `Taking the provided image of a person, realistically edit the image to make the person wear ${jerseyDescription}. Ensure the jersey fits the person's body naturally. Do not change the person's pose, face, or the background of the image. The output should only be the edited image.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }

    throw new Error('No image data found in the API response.');
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('The AI model could not process the request. Please try a different image or check the console for more details.');
  }
};
