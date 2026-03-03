import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('file://' + process.cwd() + '/public/test-acord.html');
  const height = await page.evaluate(() => {
    return document.querySelector('.acord125-page')?.scrollHeight;
  });
  console.log('Page Height:', height);
  const targetHeight = 11 * 96; // 11 inches at 96 dpi is 1056
  console.log('Target Height 11in:', targetHeight);
  await browser.close();
})();
