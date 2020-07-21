module.exports = function (sequelize, DataTypes) {
  
  const AnswerCards = sequelize.define("AnswerCards", {
      text: DataTypes.STRING,
    
    }, {
      timestamps: false,
    });
  return AnswerCards;
  
};