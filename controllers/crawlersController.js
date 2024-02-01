const User = require("../models/userModel");
const Crawler = require("../models/crawlersModel");


function crawlersController(){
    return{
        creatNewCrawler: function(req , res){
            User.findById(req.user._id).then((user)=>{
                const newCrawler = new Crawler({
                    groupName:req.body.groupName ,
                    parentID:user._id,
                    crawalers:req.body.crawlersList
                })
                newCrawler.save()
                .then((crawlerGruop)=>{
                    user.crawlers.push(crawlerGruop._id)
                    user.save()
                    return res.status(201).json({status:201 , message:"Submited successfully"})
                })
            })
        },
        crawlersList: function(req , res){
            User.findById(req.user._id).then((user)=>{
                Crawler.find({parentID:user._id}).then((crawlers)=>{
                    res.json(crawlers)
                })
            })
        }

    }
}
module.exports = crawlersController