const User = require("../models/userModel");
const Crawler = require("../models/crawlersModel");
const mongoose = require("mongoose");

function crawlersController() {
  async function getCrawlers(req) {
    User.findById(req.user._id).then((user) => {
      Crawler.find({ parentID: user._id }).then((crawlers) => {
        return crawlers;
      });
    });
  }
  return {
    creatNewCrawler: function (req, res) {
      User.findById(req.user._id).then((user) => {
        const newCrawler = new Crawler({
          groupName: req.body.groupName,
          parentID: user._id,
          crawlers: req.body.crawlersList,
        });
        newCrawler.save().then((crawlerGruop) => {
          user.crawlers.push(crawlerGruop._id);
          user.save();
          return res
            .status(201)
            .json({ status: 201, message: "Submited successfully" });
        });
      });
    },
    crawlersList: function (req, res) {
        User.findById(req.user._id).then((user) => {
            Crawler.find({ parentID: user._id }).then((crawlers) => {
               res.json(crawlers);
            });
          });
    },
    deleteCrawler: async function (req, res) {
      const crawlerID = req.params.crawlerID;
      const groupID = req.params.crawlersGroupID;
      if (crawlerID) {
        const group = await Crawler.findOne({
          _id: new mongoose.Types.ObjectId(groupID),
          parentID: req.user._id,
        });
        group.crawlers.pull({
          _id: new mongoose.Types.ObjectId(crawlerID),
        });
        group.save();
        User.findById(req.user._id).then((user) => {
            Crawler.find({ parentID: user._id }).then((crawlers) => {
               res.json(crawlers);
            });
          });
      } else {
        await Crawler.findOneAndDelete({parentID:req.user._id , _id: new mongoose.Types.ObjectId(groupID)})
        User.findById(req.user._id).then((user) => {
            Crawler.find({ parentID: user._id }).then((crawlers) => {
               res.json(crawlers);
            });
          });
      }
    },
  };
}
module.exports = crawlersController;
