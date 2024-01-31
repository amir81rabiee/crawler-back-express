const connection = require("../config/database")
const mongoose = require('mongoose');
const EmailVerificationShecma = new mongoose.Schema({
    email     : { type : String , unique : true, required : true },
    token     : {type:String , unique:true , required : true}
});

const EmailVerification = connection.model('EmailVerification', EmailVerificationShecma);
module.exports = EmailVerification;