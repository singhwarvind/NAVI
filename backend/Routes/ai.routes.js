import express from 'express';
import { handleCodeReview } from '../Controllers/ai.controller.js';


const router = express.Router();

router.post('/get-review', handleCodeReview);

export default router;
