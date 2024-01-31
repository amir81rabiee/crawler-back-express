var nodemailer = require('nodemailer');
require('dotenv').config()
var mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  module.exports = mail;