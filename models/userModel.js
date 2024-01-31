const connection = require("../config/database")
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email     : { type : String , unique : true, required : true },
    username       : { type : String , unique : true, required : true},
    hash: String,
    salt: String,
    isAdmin: {type:Boolean ,  default: false}
});


const User = connection.model('User', UserSchema);
module.exports = User;