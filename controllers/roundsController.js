const db = require("../models");

module.exports = function (router) {
  // GET request not currently needed, TBD
  // router.get("/api/getallrooms", (req, res) => {
  //   db.Rooms.findAll({
  //     attributes: ["id"],
  //   })
  //     .then((result) => {
  //       res.json({
  //         error: false,
  //         data: result,
  //         message: "Successfully retrieved rooms",
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json({
  //         error: true,
  //         data: null,
  //         message: "Unable to retrieve rooms.",
  //       });
  //     });
  // });

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
