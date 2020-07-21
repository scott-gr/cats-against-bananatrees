const db = require("../models");

module.exports = function (router) {
  router.post("/api/roundanswercards", (req, res) => {
    console.log(req);
    db.RoundAnswerCards.create({
      id: req.body.id,
      player_id: req.body.player_id,
      answer_card_id: req.body.answer_card_id,
      round_id: req.body.round_id
      // game_id:
    })
      .then((result) => {
        res.json({
          error: false,
          data: result,
          message: "Successfully created new player",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to create new player.",
        });
      });
  });
};
