const express = require("express");
const router = express.Router();
const passport = require("passport");
const connection = require('../config/database');
const User = connection.models.User;
const genPassword = require("../utils/passwordUtils").genPassword;

router.post("/login", passport.authenticate('local'), function(req, res) {
        if (req.body.remember) {
          req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
        } else {
          req.session.cookie.expires = false; // Cookie expires at end of session
        }
        res.status(202).json({validation:true , username:req.user.username})
});

router.post("/register", (req, res, next) => {
  const saltHash = genPassword(req.body.password);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.username,
    hash: hash,
    salt: salt,
  });

  newUser.save().then((user) => {
    req.logIn(user, () => {
      res.redirect("/");
    });
  });
});


router.get("/isAuthenticated", (req, res, next) => {
  // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
  if (req.isAuthenticated()) {
    res.status(202).json({status:"authenticated"});
  } else {
    res.status(401).json({status:"not authenticated"});
  }
});

// Visiting this route logs the user out
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    res.redirect("/");
  });
});
router.get("/user", (req, res, next) => {
    res.json(req.user)
  });

module.exports = router;
