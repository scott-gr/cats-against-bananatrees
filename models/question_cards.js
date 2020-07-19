module.exports = function (sequelize, DataTypes) {

    const QuestionCards = sequelize.define("QuestionCards", {
      text: DataTypes.STRING,

    }, {
      timestamps: false
    });
  
    return QuestionCards;
 
};

// function getQuestionCards() {
//   $.get("/api/question_cards", function(data) {
//     questionCards = data;
//     console.log("Question card data", data)
//   //   initializeRows();
//   });
// }

// module.exports.getQuestionCards = getQuestionCards





  