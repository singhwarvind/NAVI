import { genrateResponse } from '../services/genAI.service.js';

export async function handleCodeReview(req, res) {
  try {
    const { code } = req.body;
    if (!code || typeof code !== 'string') {
      return res.status(400).json({
        status: 'error',
        summary: 'Invalid input',
        explanation: 'No code provided',
      });
    }

    const review = await genrateResponse(code);
    res.json(review);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      summary: 'Server error',
      explanation: error.message,
    });
  }
}
