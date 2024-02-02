const puppeteer = require("puppeteer");
const Crawlers = require("../models/crawlersModel");

const browser = async () => {
  const crawlersList = await Crawlers.find();
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.addScriptTag({
    url: "https://code.jquery.com/jquery-3.2.1.min.js",
  });
  for (
    let crawlersListPosition = 0;
    crawlersListPosition < crawlersList.length;
    crawlersListPosition++
  ) {
    for (
      let crawlerPosition = 0;
      crawlerPosition < crawlersList[crawlersListPosition].crawlers.length;
      crawlerPosition++
    ) {
      var crawler =
        crawlersList[crawlersListPosition].crawlers[crawlerPosition];
      for (let i = crawler.from; i <= crawler.to; i++) {
        await page.goto(
          crawler.staticAddress + crawler.dynamicAddress.replace("*", i),
          { waitUntil: "domcontentloaded" }
        );
        let linkScript = crawler.linkScript
        console.log(
          await page.evaluate((linkScript) => {
            var urls = [];
            eval("$('.product-list-cont .item-cont .item-image .lnk-image').each((idx, el) => {   const selectedProduct = $(el);   let url = selectedProduct.attr('href').trim();    urls.push(url); }) ");
            return urls;
          })
        );
      }
    }
  }

  // // Navigate the page to a URL
  // await page.goto("https://kalatik.com/category/26/samsung");
  // await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.2.1.min.js' });

  // var data = await page.evaluate(()=>{

  // })
  // console.log(data)
  // await browser.close();

  // console.log(crawlersList)
};
module.exports = browser;
