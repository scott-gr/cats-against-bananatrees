const db = require("../models");
module.exports = function (router) {
  // GET request not currently needed, TBD
  router.get("/api/getroom/:roomid", (req, res) => {
    const roomId = parseInt(req.params.roomid);
    db.Rooms.findOne({
      where: {
        id: roomId,
      },
    })
      .then((result) => {
        res.json({
          error: false,
          data: result,
          message: "Successfully retrieved room.",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to retrieve room.",
        });
      });
  });

  router.post("/api/createnewroom", (req, res) => {
    db.Rooms.create(req.body)
      .then((result) => {
        res.json({
          error: false,
          data: result,
          message: "Successfully created new room",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to create new room.",
        });
      });
  });

  router.put("/api/updateroom", (req, res) => {
    const playerId = parseInt(req.body.playerId)
    const playerCount = parseInt(req.body.playerCount);
    const currentRoundId = parseInt(req.body.currentRoundId);
    const roomId = parseInt(req.body.roomId);
    db.Rooms.update(
      {
        host_id: playerId,
        player_count: playerCount,
        current_round_id: currentRoundId
      },
      {
        where: {
          id: roomId,
        },
      }
    )
      .then((result) => {
        res.json({
          error: false,
          data: result,
          message: "Successfully updated room",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to update room.",
        });
      });
  });
};
