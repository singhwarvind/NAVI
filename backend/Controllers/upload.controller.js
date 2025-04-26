export const reviewCode = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required." });
    }

    const prompt = `
You are a code reviewer AI. Analyze the following C++ code:
${code}

Return the result in JSON format with the following structure:
{
  "status": "correct" | "needs_fix" | "error",
  "summary": "Short summary of the code quality",
  "explanation": "Detailed markdown explanation of the code",
  "issues": [
    {
      "type": "Issue Type",
      "description": "Issue description",
      "severity": "low" | "medium" | "high",
      "corrected_code": "Updated/fixed code block (if any)"
    }
  ],
  "corrected_code": "Full corrected code if applicable"
}
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

    // Try to parse JSON safely
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      return res.status(500).json({
        status: "error",
        summary: "Parsing failed",
        explanation: "Gemini did not return valid JSON.",
        issues: [],
        corrected_code: ""
      });
    }

    // Send back the actual parsed data from AI
    res.json({
      status: parsed.status, 
      summary: parsed.summary, 
      explanation: parsed.explanation,
      issues: parsed.issues,
      corrected_code: parsed.corrected_code
    });
    
  } catch (error) {
    console.error("❌ Review Error:", error.message || error);
    res.status(500).json({
      status: "error",
      summary: "Code analysis failed",
      explanation: error.message,
      issues: [],
      corrected_code: ""
    });
  }
};
// In upload.controller.js
export const generateStudyPlan = (req, res) => {
  // Your logic for generating the study plan
};

export const summarizePDF = (req, res) => {
  // Your logic for summarizing the PDF
};
