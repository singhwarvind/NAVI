import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate study plan
export const generateStudyPlan = async (req, res) => {
  try {
    const { examDate, syllabus } = req.body;

    if (!examDate || !syllabus) {
      return res.status(400).json({ error: "Exam date and syllabus are required." });
    }

    const prompt = `
      You are an AI study planner. Generate a smart and effective daily study plan
      starting from today until the exam date: ${examDate}.
      The syllabus is: ${syllabus}

      Break it down day-by-day with topics to cover, tips, and reasonable time durations.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const plan = response.text();

    res.json({ plan }); // Return the generated study plan
  } catch (error) {
    console.error("Error generating study plan:", error);
    res.status(500).json({ error: "Failed to generate study plan" });
  }
};

// Placeholder for summarizing PDF (you can build this later)
export const summarizePDF = async (req, res) => {
  res.json({ message: "PDF summarized!" });
};
