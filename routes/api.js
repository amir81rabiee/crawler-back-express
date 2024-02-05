const express = require("express");
const router = express.Router();
const getDataController = require('../controllers/getDataController')
const getData = getDataController()


router.get('/:UserID/:CrawlerGroupID/:CrawlerID' , (req , res)=>{getData.getData(req , res)} )

module.exports = router
