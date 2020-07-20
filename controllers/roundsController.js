const db = require("../models");

module.exports = function (router) {
  router.get("/api/getrounds/:roomid", (req, res) => {
    db.Rounds.findAll({
      where: {
        id: req.params.roomid,
      },
    })
      .then((result) => {
        res.json({
          error: false,
          data: result,
          message: "Successfully retrieved rounds.",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to retrieve rounds.",
        });
      });
  });

  router.post("/api/createround", (req, res) => {
    db.Rounds.create({
      game_round: req.body.game_round,
      current_status: 1,
      judge_id: null,
      question_card_id: null,
      room_id: req.body.room_id,
      winner_id: null
    })
      .then((result) => {
        res.json({
          error: false,
          data: result,
          message: "Successfully created new round",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to create new round.",
        });
      });
  });
};
