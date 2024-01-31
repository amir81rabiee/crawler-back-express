const express = require("express");
const router = express.Router();
const verifyUtil = require("../utils/verifyEmail");
router.get("/:token", async (req, res) => {
  const status = await verifyUtil(req.params.token);
  if (status=="OK") {
    return res.send(`<!DOCTYPE html> <html lang="fa" dir="rtl"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>تایید ایمیل</title> <style> @font-face { font-family: "Shabnam"; src: url('/font/Shabnam.ttf'); }

        *{ font-family:'Shabnam', Courier, monospace; margin: 0; padding: 0; } .container{ display: flex; justify-content: center; align-items: center; flex-direction: column; height: 100vh; } .icon{ width: 12rem; } img{ width: 100%; height: auto; } .text{ text-align: center; margin:2rem 0; } a { display: inline-block; margin-right: 10px; background: #339DFF; color: #fff; text-decoration: none; font-size: 1.5rem; line-height: 38px; border-radius: 50px; -webkit-transition: all 0.3s; transition: all 0.3s; text-align: center; padding: 0.75rem; border-width: 0; } a:hover { background: #fff; color: #339DFF; box-shadow: 0 4px 4px rgba(83, 100, 255, 0.32); } </style> </head> <body> <div class="container"> <div class="icon"> <img src="/images/tickpng.png" alt="icon"> </div> <div class="text"> <h1>تایید!</h1> <h4>اکانت شما با موفقیت تایید شد</h4> </div> <div class="btn-div"> <a type="button" href="http://localhost:3000/dashboard">صفحه داشبورد شما</a> </div></div> </body> </html>`);
  }
  if (status == "NO_EMAIL") {
    return res.render("bad");
  }
});

module.exports = router;
