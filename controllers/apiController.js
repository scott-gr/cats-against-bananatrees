const express = require("express");
const router = express.Router();

// router.get("/api/config", (req, res) => {
//   res.json({
//     success: true,
//   });
// });

router.get("/api/getanswercards", (req, res) => {
  // this is where you'll call on the cards model to get cards data from db
  const mockAnswerCardRes = {
    1: "Bees?",
    2: "Your Mom.",
    3: "2 midgets shitting in a bucket",
    4: "Amputees",
    5: "Republicans",
    6: "Barrack Obama",
    7: "Being a motherfucking sorcerer",
    8: "McDonalds",
    9: "Orphans",
    10: "Being a dick to children",
  };
  res.json(mockAnswerCardRes);
});

module.exports = router;
