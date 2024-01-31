const router = require("express").Router();
const passport = require("passport");
const genPassword = require("../lib/passwordUtils").genPassword;
const connection = require("../config/database");
const User = connection.models.User;

/**
 * -------------- POST ROUTES ----------------
 */

router.post('/login', passport.authenticate('local', {
}), (req, res) => {
 
    if ( req.body.remember ) {
      req.session.cookie.originalMaxAge = 7 * 24 * 60 * 60 * 1000 // Expires in 7 day
    } else {
      req.session.cookie.expires = false
    }
    res.status(202).json({"message" : "Success"})

})
router.post("/register", (req, res, next) => {
  User.findOne({ username: req.body.username }).then((user) => {
    console.log(user)
    if(!user){
      const saltHash = genPassword(req.body.password);
      const salt = saltHash.salt;
      const hash = saltHash.hash;
    
      const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt,
      });
      newUser.save();
      req.login(newUser, (err) => {
        if (err) {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        }
      });
    }
    else{
      console.log(user)
      res.status(409).send('user already exists')
    }
  });

  

});


// Visiting this route logs the user out
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
  res.redirect("/");
});


module.exports = router;
