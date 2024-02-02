const puppeteer = require("puppeteer");

const browser = async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://kalatik.com/category/26/samsung");
  await page.addScriptTag({ url: 'https://code.jquery.com/jquery-3.2.1.min.js' });
  
  var data = await page.evaluate(()=>{
    var pr = []
    function toEnglishNumber(strNum) {
        var pn = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        var en = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var an = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
        var cache = strNum;
        for (var i = 0; i < 10; i++) {
            var regex_fa = new RegExp(pn[i], 'g');
            var regex_ar = new RegExp(an[i], 'g');
            cache = cache.replace(regex_fa, en[i]);
            cache = cache.replace(regex_ar, en[i]);
        }
        return cache;
    }
    // ... give time for script to load, then type (or see below for non wait option)
    var divPrice = $('.product-list-cont .item-cont .item-content .item-price-outer .item-price-inner .item-price-value')
    divPrice.each(function(index){pr.push(parseFloat(toEnglishNumber($(this).text().replace(',', '').replace(',', '').replace('تومان', '').trim())))})
    return pr
  })
  console.log(data)
  await browser.close();
};
module.exports = browser;
