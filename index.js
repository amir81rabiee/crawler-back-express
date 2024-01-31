const express = require("express");
const session = require("express-session");
var passport = require("passport");
const User = require('./models/userModel');
const registrationRoutes = require('./routes/registration')
var cors = require('cors')

// Package documentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require("connect-mongo");


require("dotenv").config();

// Create the Express application
var app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


require('./config/database')

require('./config/passport')


// app.use(session({ secret: "123", resave: true, saveUninitialized: true, cookie: {maxAge: 60 * 60 * 24 * 1000} }));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  })
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */


app.use(passport.initialize());
app.use(passport.session());

/**
 * -------------- ROUTES ----------------
 */


  app.use(registrationRoutes)



/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:9000
app.listen(8888);

