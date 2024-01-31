const express = require("express");
const router = express.Router();
const verifyUtil = require("../utils/verifyEmail")
router.get("/:token" ,async (req , res)=>{
    const status = await verifyUtil(req.params.token)
    if(status=="ok"){
        res.send("OK")
    }
    if(status == "NO_EMAIL"){
        res.send("bad")
    }
    else{
        res.send(status)
    }
})

module.exports = router