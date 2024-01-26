import puppeteer from "puppeteer";

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: "new",
  });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://wikipedia.org/");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  await page.pdf({ path: "./pdf.pdf" });

  await browser.close();
})();
