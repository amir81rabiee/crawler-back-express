const passport = require("passport");
const User = require("../models/userModel");
const genPassword = require("../utils/passwordUtils").genPassword;
const credentials = require("../utils/checkCredentials");
const checkCredentials = credentials();
function registrationController() {
  return {
    //Register new user
    register: function (username, password, email, isAdmin, req, res) {
      if (checkCredentials.checkUsername(username) == "BAD_USERNAME") {
        return res.status(406).json({ message: "BAD_USERNAME" });
      }
      if (checkCredentials.checkEmail(email) == "BAD_EMAIL") {
        return res.status(406).json({ message: "BAD_EMAIL" });
      }
      if (checkCredentials.checkPassword(password) == "BAD_PASSWORD") {

        return res.status(406).json({ message: "BAD_PASSWORD" , pasword:password });
      } else {
        const saltHash = genPassword(password);

        const salt = saltHash.salt;
        const hash = saltHash.hash;
        const newUser = new User({
          username: username,
          email: email,
          hash: hash,
          salt: salt,
          isAdmin: isAdmin,
        });

        newUser.save().then((user) => {
          req.logIn(user, () => {
            res.redirect("/");
          });
        }).catch((err)=>{
          if(err.code == 11000){
            res.status(406).json({message:"Username or email already exist"})
          }
        });
      }
    },

    //check if user is authenticated
    isAuthenticated: function (req, res , next) {
      if (req.isAuthenticated()) {
        if(next){
          return next()
        }
        res.status(202).json({ status: "authenticated" });
      } else {
        res.status(401).json({ status: "not authenticated" });
      }
    },

    //Logout user
    logout: function (req, res) {
      req.logout((err) => {
        res.redirect("/");
      });
    },
  };
}

module.exports = registrationController;
