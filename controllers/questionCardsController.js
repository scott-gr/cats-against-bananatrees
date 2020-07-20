const db = require('../models');
module.exports = function (router) {
  router.get('/api/question_cards', (req, res) => {
    db.QuestionCards.findAll()
      .then((result) => {
        res.json({
          error: false,
          data: result,
          message: 'Successfully retrieved question cards',
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
