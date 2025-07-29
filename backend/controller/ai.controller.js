import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Check for API Key at startup
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("FATAL ERROR: GEMINI_API_KEY is not set in the environment variables.");
    process.exit(1); // Exit if the key is missing
}

// Initialize the Google Generative AI client with your API key
const genAI = new GoogleGenerativeAI(apiKey);

// Define a persona and safety settings for the chatbot
const model = genAI.getGenerativeModel({
   model: "models/gemini-1.5-flash",
    safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ],
});

export const generateResponse = async (req, res) => {
    try {
        const { history, prompt } = req.body;

        // Input validation
        if (!prompt || typeof prompt !== 'string' || prompt.trim() === "") {
            return res.status(400).json({ message: "A valid 'prompt' is required." });
        }
        if (!Array.isArray(history)) {
             return res.status(400).json({ message: "'history' must be an array." });
        }

        const chat = model.startChat({
            // Give the chatbot a persona and instructions
            history: [
                { role: "user", parts: [{ text: "You are AiOneCart Assistant, a friendly and helpful e-commerce chatbot. Your goal is to assist users with their shopping questions, provide information about products, and guide them through the website. Be polite, concise, and always focus on being helpful to the customer." }] },
                { role: "model", parts: [{ text: "Understood! I am the AiOneCart Assistant, ready to help customers with their shopping needs." }] },
                ...history
            ],
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;

        // Check if the response was blocked by safety settings
        if (response.promptFeedback?.blockReason) {
            return res.status(200).json({ text: "I'm sorry, I can't respond to that. How else can I help you with your shopping?" });
        }

        const text = response.text();
        res.json({ text });

    } catch (error) {
        console.error("Error in generateResponse controller:", error);
        res.status(500).json({ message: "Failed to generate response from AI. Please check the server logs." });
    }
};


