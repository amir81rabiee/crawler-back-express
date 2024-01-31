const EmailVerification = require("../models/emailVerificationModel");
const User = require("../models/userModel");
async function verifyEmail(token){
const verifyDoc =  await  EmailVerification.findOne({token:token})
if(verifyDoc){
    await User.findOneAndUpdate({email:verifyDoc.email} , {verifiedEmail:true})
    return "OK"
}
else{
    return "NO_EMAIL"
}
}
module.exports = verifyEmail