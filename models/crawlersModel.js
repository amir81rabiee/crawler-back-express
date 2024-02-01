const connection = require("../config/database");
const mongoose = require("mongoose");

const CrawlerSchema = new mongoose.Schema(
  {
    name: String,
    // uid: { unique: true, required: true, type: String },
    staticAddress: String,
    dynamicAddress: String,
    from: Number,
    to: Number,
    count: Number,
    script:String,
    doneCrawled: {type:Number , default:0},
    isCrawling: {type : Boolean , default:false}
  },
  { timestamps: true }
);

const CrawlerGroupSchema = new mongoose.Schema(
  {
    groupName: String,
    parentID:String,
    // uid: { unique: true, required: true, type: String },
    crawlers: [CrawlerSchema],
  },
  { timestamps: true }
);

const CrawlersGruop = connection.model("CrawlersGruop", CrawlerGroupSchema);
module.exports = CrawlersGruop;
