const connection = require("../config/database");
const mongoose = require("mongoose");

const CrawlerSchema = new mongoose.Schema(
  {
    name: String,
    // uid: { unique: true, required: true, type: String },
    staticURL: String,
    dynamicURL: String,
    from: Number,
    to: Number,
    repeat: Number,
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
    crawalers: [CrawlerSchema],
  },
  { timestamps: true }
);

const CrawlersGruop = connection.model("CrawlersGruop", CrawlerGroupSchema);
module.exports = CrawlersGruop;
