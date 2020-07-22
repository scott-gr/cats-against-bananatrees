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
      winner_id: null,
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
  router.get("/api/getRounds/:game_round"),
    (req, res) => {
      db.Rounds.findAll({
        where: {
          room_id: req.params.game_round,
        },
      })
        .then((result) => {
          res.json({
            error: false,
            data: result,
            message: "Successfully retrieved rounds",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: true,
            data: null,
            message: "Unable to retrieve rounds",
          });
        });
    };

  router.put("/api/addroundquestion", (req, res) => {
    const roundId = parseInt(req.body.roundId);
    const questionCardId = parseInt(req.body.questionCardId);
    db.Rounds.update(
      {
        question_card_id: questionCardId
      },
      {
        where: {
          id: roundId,
        },
      }
    )
      .then((result) => {
        console.log("round question", result);
        res.json({
          error: false,
          data: result,
          message: "Successfully updated round",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to update round.",
        });
      });
  });

  router.put("/api/addroundjudgeid", (req, res) => {
    const roundId = parseInt(req.body.roundId);
    const judgeId = parseInt(req.body.judgeId);
    db.Rounds.update(
      {
        judge_id: judgeId
      },
      {
        where: {
          id: roundId,
        },
      }
    )
      .then((result) => {
        console.log("round question", result);
        res.json({
          error: false,
          data: result,
          message: "Successfully updated round",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to update round.",
        });
      });
  });

  router.put("/api/addwinnerid", (req, res) => {
    const roundId = parseInt(req.body.roundId);
    const winnerId = parseInt(req.body.winnerId);
    db.Rounds.update(
      {
        winner_id: winnerId
      },
      {
        where: {
          id: roundId,
        },
      }
    )
      .then((result) => {
        res.json({
          error: false,
          data: result,
          message: "Successfully updated round",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: "Unable to update round.",
        });
      });
  });
};
