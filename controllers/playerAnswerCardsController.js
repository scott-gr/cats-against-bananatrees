const db = require('../models');

module.exports = (router) => {
  router.get('/api/playeranswercards/:playerid', (req, res) => {
    db.PlayersAnswerCards.findAll({
      where: {
        player_id: req.params.playerid
      }
    })
      .then((result) => {
        res.json({
          error: false,
          data: result,
          message: 'Successfully retrieved answer cards',
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: true,
          data: null,
          message: 'Unable to retrieve cards.',
        });
      });
  });
};