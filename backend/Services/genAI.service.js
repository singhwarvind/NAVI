import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); 

export async function genrateResponse(prompt, options = {}) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    ...options
  });

  const result = await model.generateContent(prompt);
  return result.response.text().replace(/```json|```/g, '').trim();
}
