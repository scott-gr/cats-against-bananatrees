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

  router.post("/api/createplayer", (req, res) => {
    db.Players.create(req.body)
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
