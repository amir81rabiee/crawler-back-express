const Crawler = require("../models/crawlersModel");
const mongoose = require("mongoose");

function getDataController(){
    return{
        getData: async(req , res)=>{
            const crawlerGroupID = req.params.CrawlerGroupID
            const userID = req.params.UserID
            const crawlerID = req.params.CrawlerID
            const crawlerGroupData = await Crawler.findOne({_id:crawlerGroupID , parentID:userID})
            if (!crawlerGroupData){
                res.json({message:"NO_DATA_FOUND"})
                return
            }
            const crawlerData = crawlerGroupData.crawlers.find((ele)=>{ return ele._id.toString() ==crawlerID})
            res.json(JSON.parse(crawlerData.data))
        }

    }
}
module.exports = getDataController