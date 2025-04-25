import { readFileSync } from 'fs';
import pdfjsLib from 'pdfjs-dist';

export async function extractTextFromPDF(path) {
  const data = new Uint8Array(readFileSync(path));
  const pdf = await pdfjsLib.getDocument({ data }).promise;

  let textContent = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    textContent += content.items.map(item => item.str).join(' ');
  }

  return textContent;
}
