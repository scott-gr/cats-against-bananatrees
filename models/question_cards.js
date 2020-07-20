module.exports = function (sequelize, DataTypes) {

    const QuestionCards = sequelize.define("QuestionCards", {
      text: DataTypes.STRING,

    }, {
      timestamps: false
    });
  
    return QuestionCards;
 
};






  