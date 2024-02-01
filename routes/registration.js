const express = require("express");
const router = express.Router();
const passport = require("passport");
const registration = require('../controllers/registrationController')
const registrationController = registration()


router.post("/login", passport.authenticate('local'), function(req, res) {
        if (req.body.remember) {
          req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
        } else {
          req.session.cookie.expires = false; // Cookie expires at end of session
        }
        res.status(202).json({validation:true , username:req.user.username})
});

router.post("/register" , (req, res, next) => {
  registrationController.register(req , res)
  // res.json({message:"OK"})
});


router.get("/isAuthenticated", (req, res, next) => {
  // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
  registrationController.isAuthenticated(req ,res)
});

// Visiting this route logs the user out
router.get("/logout", (req, res, next) => {
  registrationController.logout(req , res)
});
router.get("/user", (req, res, next) => {
    res.json(req.user)
  });

module.exports = router;
