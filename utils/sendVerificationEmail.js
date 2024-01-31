const crypto = require("crypto");
const EmailVerification = require("../models/emailVerificationModel");
const transporter = require("../config/nodemailer");
const token = crypto.randomUUID();
function sendVerificationEmail(email) {
  const mailOptions = {
    from: "amirhr308@gmail.com",
    to: email,
    subject: "تایید ایمیل",
    html: `<a href="http://localhost:8888/verify/${token}">لطفا ایمیل خود را تایید کنید</a>`,
  };
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email: ", error);
//     } else {
//       console.log("Email sent: ", info.response);
//       const newEmailVerification = new EmailVerification({
//         emailemail,
//         token: token,
//       });
//       newEmailVerification.save();
//     }
//   });

const newEmailVerification = new EmailVerification({
            email:email,
            token: token,
          });
          newEmailVerification.save();
}
module.exports = sendVerificationEmail;
