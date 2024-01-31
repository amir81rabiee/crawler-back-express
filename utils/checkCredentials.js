const User = require("../models/userModel");

const usernameRegEx = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const emailRegEx =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
function checkCredentials() {
  return {
    checkUsername: function (username) {
      if (!usernameRegEx.test(username)) {
        return "BAD_USERNAME";
      }
    },
    checkEmail: function (email) {
      if (!emailRegEx.test(email)) {
        return "BAD_EMAIL";
      }
    },
    checkPassword: function (password) {
      if (!passwordRegEx.test(password)) {
        return "BAD_PASSWORD";
      } else {
        return true;
      }
    },
  };
}
module.exports = checkCredentials;
