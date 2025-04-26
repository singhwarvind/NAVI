import express from 'express';
import multer from 'multer';
import { generateStudyPlan, summarizePDF } from '../Controllers/upload.controller.js';


const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/', upload.single('syllabus'), generateStudyPlan);
router.post('/summarize', upload.single('material'), summarizePDF);

export default router;
