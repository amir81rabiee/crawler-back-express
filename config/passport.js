const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');
const {validatePassword} = require('../utils/passwordUtils');

passport.use(
    new LocalStrategy(function (username, password, cb) {
      User.findOne({ username: username })
        .then((user) => {
          if (!user) {
            return cb(null, false);
          }
  
          // Function defined at bottom of app.js
          const isValid = validatePassword(password, user.hash, user.salt);
  
          if (isValid) {
            return cb(null, user);
          } else {
            return cb(null, false);
          }
        })
        .catch((err) => {
          cb(err);
        });
    })
  );
  
  /**
   * This function is used in conjunction with the `passport.authenticate()` method.  See comments in
   * `passport.use()` above ^^ for explanation
   */
  passport.serializeUser(function (user, cb) {
    cb(null, user.id);
  });
  
  /**
   * This function is used in conjunction with the `app.use(passport.session())` middleware defined below.
   * Scroll down and read the comments in the PASSPORT AUTHENTICATION section to learn how this works.
   *
   * In summary, this method is "set" on the passport object and is passed the user ID stored in the `req.session.passport`
   * object later on.
   */
  passport.deserializeUser(function (id, cb) {
    User.findById(id).then((value) => {
      if (value) {
        return cb(null, value);
      }
    });
  });
  