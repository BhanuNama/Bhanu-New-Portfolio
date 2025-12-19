
import { GoogleGenAI } from "@google/genai";

const RESUME_CONTEXT = `
Name: Bhanu Nama
Contact: +91-7993073400, bhanunama08@gmail.com
Objective: Aspiring Software Developer and CSE graduate skilled in MERN stack, Python and Database Systems.
Education:
- B.Tech (CSE) from KMIT (2021-2025), CGPA 8.3
- Intermediate from Sri Gayatri College (2019-2021), 97%
- Schooling from Prerana High School (2019), GPA 10.0
Projects:
1. FakeBuster: AI Deepfake Detection (98.7% accuracy). Tools: React, FastAPI, Python, Deep Learning.
2. Nutri Guide: AI Meal Planner using Gemini API. Tools: MERN, Chart.js.
3. Campus Connect: MERN stack for campus management.
Skills: Java, Python, JS, ReactJS, SQL, MongoDB, AWS, ML, DSA.
`;

export async function askResumeQuestion(question: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: `You are an AI assistant for Bhanu Nama's portfolio. Use the following context to answer questions professionally: ${RESUME_CONTEXT}. Keep answers concise and enthusiastic.`,
        temperature: 0.7,
      }
    });
    return response.text || "I'm sorry, I couldn't process that. Feel free to contact Bhanu directly!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI. Please check the contact section to reach Bhanu.";
  }
}
