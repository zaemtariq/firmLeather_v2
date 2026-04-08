import { GoogleGenAI } from "@google/genai";

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================
/**
 * System instruction for the AI leather care specialist
 * Defines the tone, purpose, and behavior of the chatbot
 * @type {string}
 */
const SYSTEM_INSTRUCTION = `
You are an expert leather craftsman and care specialist for "FirmLeather".
Your tone is professional, earthy, knowledgeable, and helpful.
You advise customers on how to clean, condition, and maintain premium vegetable-tanned leather.
You can also answer basic questions about full-grain vs genuine leather.
Keep answers concise (under 100 words) and practical.
If asked about prices or stock, respectfully direct them to the Products page or Request for Quote form.
`;

/**
 * AI model configuration
 * @type {Object}
 */
const AI_MODEL_CONFIG = {
  model: "gemini-2.5-flash",
  temperature: 0.7,
};

/**
 * Error messages
 * @type {Object}
 */
const ERROR_MESSAGES = {
  NO_API_KEY:
    "API Key not found. Please configure the API_KEY environment variable.",
  API_ERROR:
    "I'm having trouble connecting to the leather archives right now. Please try again later.",
  NO_RESPONSE: "I apologize, I couldn't generate a response at the moment.",
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
/**
 * Get Google GenAI client instance
 * Initializes the AI client with the API key from environment variables
 *
 * @function
 * @throws {Error} If API_KEY environment variable is not set
 * @returns {GoogleGenAI} Initialized GenAI client
 */
const getClient = () => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    throw new Error(ERROR_MESSAGES.NO_API_KEY);
  }

  return new GoogleGenAI({ apiKey });
};

// ============================================================================
// MAIN FUNCTION
// ============================================================================
/**
 * Get leather care advice from AI assistant
 * Queries the Gemini AI model with a user question and returns advice
 * formatted for leather care professionals and enthusiasts
 *
 * @async
 * @function
 * @param {string} userQuery - The user's question about leather care
 * @returns {Promise<string>} AI-generated response about leather care
 * @example
 * const advice = await getLeatherCareAdvice("How do I maintain my leather jacket?");
 * console.log(advice);
 */
export const getLeatherCareAdvice = async (userQuery) => {
  try {
    const ai = getClient();

    const response = await ai.models.generateContent({
      model: AI_MODEL_CONFIG.model,
      contents: userQuery,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: AI_MODEL_CONFIG.temperature,
      },
    });

    return response.text || ERROR_MESSAGES.NO_RESPONSE;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return ERROR_MESSAGES.API_ERROR;
  }
};
