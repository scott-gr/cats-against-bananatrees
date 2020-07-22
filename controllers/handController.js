const db = require('../models');

module.exports = function (router) {
  router.get("/api/hands/:playerid", (req, res) => {
  db.Hands.findAll({
    where: {
      player_id:req.params.playerid
    },
  })
    .then((result) => {
      res.json({
        error: false,
        data: result,
        message: "Successfully retrieved hand."
      });      
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "Unable to retrieve hand.",
      });
    });
});

  router.post("/api/hands", (req, res) => {
    db.Hands.create({
      player_id: parseInt(req.body.player_id),
      answer_card_id: parseInt(req.body.answer_card_id)
    })
      .then((result) => {
        res.json({
          error: false,
          data: result,
          message: "Successfully created new Hand",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to create new Hand.",
        });
      });
  });

  router.delete("/api/hands", (req, res) => {
    const id = parseInt(req.body.id);
    const playerId = parseInt(req.body.playerid);
    db.Hands.destroy({
      where: {
        answer_card_id: id,
        player_id: playerId
      }
    })
      .then(deletedHand => {
        res.json(deletedHand);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to create new Hand.",
        });
      });
  });
  
};