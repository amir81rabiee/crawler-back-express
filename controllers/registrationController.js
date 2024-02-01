const passport = require("passport");
const User = require("../models/userModel");
const genPassword = require("../utils/passwordUtils").genPassword;
const credentials = require("../utils/checkCredentials");
const sendVerificationEmail = require("../utils/sendVerificationEmail")
const checkCredentials = credentials();
function registrationController() {
  return {
    //Register new user
    register: function (req, res) {
        if (
          checkCredentials.checkUsername(req.body.username) == "BAD_USERNAME"
        ) {
          return res.status(406).json({ message: "BAD_USERNAME" });
        }
      if (checkCredentials.checkEmail(req.body.email) == "BAD_EMAIL") {
        return res.status(406).json({ message: "BAD_EMAIL" });
      }
      if (checkCredentials.checkPassword(req.body.password) == "BAD_PASSWORD") {
        return res
          .status(406)
          .json({ message: "BAD_PASSWORD", pasword: req.body.password });
      } else {
        // if(req.body.needVerifyEmail){
        //   sendVerificationEmail(req.body.email)
        // }
        const saltHash = genPassword(req.body.password);

        const salt = saltHash.salt;
        const hash = saltHash.hash;
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          hash: hash,
          salt: salt,
          isAdmin: req.body.isAdmin,
          verifiedEmail: !req.body.needVerifyEmail,
          userBandwith:req.body.userBandwith
        });
        newUser.save().then((user)=>{res.status(201).json({message:"USER_CREATED_SUCCESSFULLY"})})
          .catch((err) => {
            if (err.code == 11000) {
              res
                .status(406)
                .json({ message: "Username or email already exist" });
            }
          });
      }
    },

    //check if user is authenticated
    isAuthenticated: function (req, res, next) {
      if (req.isAuthenticated()) {
        if (next) {
          return next();
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
