const db = require("../models");

//get route
module.exports = function (router) {
  router.get("/api/getroomplayers/:roomid", (req, res) => {
    db.Players.findAll({
      where: {
        room_id: req.params.roomid,
      },
    })
      .then((result) => {
        res.json({
          error: false,
          data: result,
          message: "Successfully retrieved players",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to retrieve players.",
        });
      });
  });
//post route
  router.post("/api/createplayer", (req, res) => {
    db.Players.create({
      name: req.body.name,
      socket_id: req.body.socket_id,
      points: 0,
      room_id: req.body.room_id
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
