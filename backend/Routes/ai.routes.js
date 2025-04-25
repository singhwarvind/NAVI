import express from 'express';
import { handleCodeReview } from '../controllers/ai.controller.js';


const router = express.Router();

router.post('/get-review', handleCodeReview);

export default router;
