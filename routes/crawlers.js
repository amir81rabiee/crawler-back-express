const express = require("express");
const router = express.Router();
const crawler = require('../controllers/crawlersController')

const crawlersController = crawler()



router.get('/crawlers_status')
router.get('/crawlers_list' , (req , res)=>{
    crawlersController.crawlersList(req , res)
})
router.post('/new_crawler' , (req , res)=>{
    crawlersController.creatNewCrawler(req , res)
})
router.delete("/:crawlersGroupID/:crawlerID?" , (req, res)=>{
    crawlersController.deleteCrawler(req , res)
})
module.exports = router
