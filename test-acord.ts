import puppeteer from 'puppeteer';
import * as fs from 'fs';
import { generateAcord125FullForm } from './src/lib/services/pdf/ApplicationPacketPDF';

(async () => {
  const html = generateAcord125FullForm({} as any);
  const fullHtml = `<!DOCTYPE html><html><body style="margin:0; background:#ccc;">${html}</body></html>`;
  fs.writeFileSync('public/test-acord.html', fullHtml);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
  await page.pdf({ path: 'public/test.pdf', format: 'Letter', printBackground: true });
  await browser.close();
})();
