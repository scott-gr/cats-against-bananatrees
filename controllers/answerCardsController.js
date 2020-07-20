const db = require('../models');
module.exports = function (router) {
  router.get('/api/answer_cards', (req, res) => {
    db.AnswerCards.findAll()
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
          message: 'Unable to retrieve answer cards.',
        });
      });
  });
};