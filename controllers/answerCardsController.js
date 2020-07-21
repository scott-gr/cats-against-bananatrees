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
  router.post('/api/roundAnswer', (req, res) => {
    db.AnswerCards.create({
      id: req.body.id,
      text: req.body.text,
    })
    .then((result) => {
      res.json({
        error: false,
        data: result,
        message: "Successfully created new thing"
      });
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        error: true,
        data: null,
        message: "unable to create a new thing"
      })
    })
  })
};