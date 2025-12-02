import { GoogleGenAI } from "@google/genai";
import { TopicContent, Question, Flashcard } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Helper to sanitize JSON string from Gemini response
const cleanJson = (text: string) => {
    return text.replace(/```json/g, '').replace(/```/g, '').trim();
};

export const generateTopicContent = async (topicTitle: string): Promise<Partial<TopicContent>> => {
    try {
        const model = 'gemini-2.5-flash';
        const prompt = `
        You are an expert Turkish history and geography teacher for exam preparation (KPSS/TYT/AYT).
        Create content for the topic: "${topicTitle}".
        
        Return a JSON object with the following structure:
        {
            "summary": "A concise 2-sentence summary of the topic.",
            "flashcards": [
                { "id": "gen_1", "front": "Question/Term", "back": "Answer/Definition" },
                { "id": "gen_2", "front": "Question/Term", "back": "Answer/Definition" }
            ],
            "questions": [
                { 
                    "id": "gen_q1", 
                    "text": "Multiple choice question text?", 
                    "options": ["Option A", "Option B", "Option C", "Option D"], 
                    "correctIndex": 0, 
                    "type": "MULTIPLE_CHOICE" 
                }
            ]
        }
        Generate 3 flashcards and 2 questions. Keep the language Turkish.
        `;

        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

        const text = response.text;
        if (!text) throw new Error("No response from AI");
        
        const data = JSON.parse(cleanJson(text));
        return data;

    } catch (error) {
        console.error("Gemini Generation Error:", error);
        return {
            summary: "İçerik oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
            flashcards: [],
            questions: []
        };
    }
};