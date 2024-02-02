const connection = require("../config/database");
const mongoose = require("mongoose");


const CrawlerGroupSchema = new mongoose.Schema(
  {
    groupName: String,
    parentID:String,
    // uid: { unique: true, required: true, type: String },
    crawledData : String
  },
  { timestamps: true }
);

const CrawlersGruop = connection.model("CrawlersGruop", CrawlerGroupSchema);
module.exports = CrawlersGruop;
