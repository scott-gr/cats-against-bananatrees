// SELECT column FROM table
// ORDER BY RAND()
// LIMIT 1


const db = require('../models');
module.exports = function (router) {
  router.post("/api/createhand", (req, res) => {
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
};