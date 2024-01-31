const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const connection = require("./database");
const { validatePassword } = require("../lib/passwordUtils");
const User = connection.models.User;

passport.use(
  new LocalStrategy(function (username, password, cb) {
    User.findOne({ username: username }).then((user) => {
      if (!user) {
        return cb(null, false);
      }
      const isValid = validatePassword(password , user.hash , user.salt)
      if(isValid){
        return cb(null , user)
      }
      else{
        return cb(null , false)
      }
    }).catch((err)=>{cb(err)});
  })
);

passport.serializeUser((user , cb)=>{
    cb(null , user.id)
})

passport.deserializeUser((userID , cb)=>{
    User.findById(userID).then((user)=>{
        cb(null , user)
    })
    .catch((err)=>{cb(err)})
})