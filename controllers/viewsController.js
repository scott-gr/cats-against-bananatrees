const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("../views/index.handlebars");
});

router.get("/pregame", function (req, res) {
  res.render("../views/pregame.handlebars");
});

router.get("/game", function (req, res) {
  res.render("../views/game.handlebars");
});

module.exports = router;