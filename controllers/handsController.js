const db = require('../models');

module.exports = function (router) {
  router.get("/api/hands/:playerid", (req, res) => {
  db.Hand.findAll({
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
    db.Hand.create({
      player_id: req.body.player_id,
      answer_card_id: req.body.answer_card_id
    })
      .then((result) => {
        console.log("Hand post call:", result);
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

  router.delete("/api/hands/:id", (req, res) => {
    const id = req.params.id;
    db.Hand.destroy({
      where: {id:id}
    })
      .then(deletedHand => {
        res.json(deletedHand);
      });
  });
  
};