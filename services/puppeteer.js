const puppeteer = require("puppeteer");
const Crawlers = require("../models/crawlersModel");

const browser = async () => {
  const crawlersList = await Crawlers.find();
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  let links= []
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
        const linkCrawler =crawler.linkScript
        
         links.push({crawlerId:crawler._id.toString(), links: await page.evaluate((linkCrawler) => {
          var urls =[]
          eval(linkCrawler)
          return urls;
        } , linkCrawler)} )
      }
      
    }
  }
  let crawleddata = []
  for(let index = 0 ; index<links.length ; index++){
    for(let link = 0 ; link< links[index].links.length ; link++){
      await page.goto(links[index].links[link])
      const dataCrawler =crawler.productPageScript
      crawleddata.push({crawlerId:links[index].crawlerId, links: await page.evaluate((dataCrawler) => {
        var productTitle = "" ; var image = [] ; var price = 0 ; var salesPrice = 0;var description ="" ;
        eval(dataCrawler)
        return {productTitle:productTitle , image:image , price:price , salesPrice:salesPrice , description:description};
      } , dataCrawler)} )
    }
  }
  console.log(crawleddata)




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
