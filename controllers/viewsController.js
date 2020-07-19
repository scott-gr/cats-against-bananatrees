const express = require("express");
const router = express.Router();

app.get("/", function (req, res) {
  res.render(__dirname + "/views/index.handlebars");
});

app.get("/pregame", function (req, res) {
  res.render(__dirname + "/views/pregame.handlebars");
});

app.get("/game", function (req, res) {
  res.render(__dirname + "/views/game.handlebars");
});

module.exports = router;