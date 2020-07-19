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
    //   db.Post.update(req.body,
    //     {
    //       where: {
    //         id: req.body.id
    //       }
    //     })
    //     .then(function(dbPost) {
    //       res.json(dbPost);
    //     });
    // });
    db.Rooms.update(
      {
        host_id: req.body.host_id,
        player_count: req.body.player_count,
        current_round_id: req.body.current_round_id,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    )
      .then((result) => {
        console.log("room put route:", result);
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
