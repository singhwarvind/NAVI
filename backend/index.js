import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import pdfjsLib from 'pdfjs-dist';
import canvas from 'canvas';
import aiRoutes from './routes/ai.routes.js';
import uploadRoutes from './routes/upload.routes.js';

const app = express();
const { createCanvas } = canvas;
const __dirname = dirname(fileURLToPath(import.meta.url));

global.DOMMatrix = createCanvas(1, 1).DOMMatrix;
global.ImageData = canvas.ImageData;
global.Path2D = canvas.Path2D;

pdfjsLib.GlobalWorkerOptions.workerSrc = resolve(__dirname, 'node_modules/pdfjs-dist/build/pdf.worker.js');

app.use(express.json());
app.use(cors());

app.use('/ai', aiRoutes);
app.use('/upload', uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
