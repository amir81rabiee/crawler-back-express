const puppeteer = require("puppeteer");
const Crawlers = require("../models/crawlersModel");
const mongoose = require("mongoose");

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
        crawler.isCrawling = true
        crawlersList[crawlersListPosition].save()
        var urlArray = []
      for (let i = crawler.from; i <= crawler.to; i++) {
        await page.goto(
          crawler.staticAddress + crawler.dynamicAddress.replace("*", i),
          { waitUntil: "domcontentloaded" ,timeout: 0 }
        );
        const linkCrawler =crawler.linkScript
          let res = await page.evaluate((linkCrawler) => {
            var urls =[]
            eval(linkCrawler)
            return urls;
          } , linkCrawler)
          urlArray.push(...res)
        }
        links.push({crawlerGroupID:crawlersList[crawlersListPosition]._id.toString() , crawlerId:crawler._id.toString(), links:urlArray} )

    }
  }
  // console.log(links)
  for(let index = 0 ; index<links.length ; index++){
    let crawledData = []
    for(let link = 0 ; link< links[index].links.length ; link++){
      await page.goto(links[index].links[link] , { waitUntil: "domcontentloaded" ,timeout: 0 })
      const dataCrawler =crawler.productPageScript
      crawledData.push( await page.evaluate((dataCrawler) => {
        var productTitle = "" ; var image = [] ; var price = 0 ; var salesPrice = 0;var description ="" ;
        eval(dataCrawler)
        return {productTitle:productTitle , image:image , price:price , salesPrice:salesPrice , description:description};
      } , dataCrawler) )
    }
    const jsonString = JSON.stringify(crawledData) 
    let newRecord = await Crawlers.findOneAndUpdate(
      { _id:new mongoose.Types.ObjectId(links[index].crawlerGroupID) , "crawlers._id":new mongoose.Types.ObjectId(links[index].crawlerId)  },
      { $set:{"crawlers.$.data": jsonString,"crawlers.$.isCrawling": false }}
    );
    newRecord.save()
  }

};
module.exports = browser;
