module.exports = function (sequelize, DataTypes) {
  
  const RoundAnswerCards = sequelize.define("RoundAnswerCards", {
      player_id: DataTypes.INTEGER,
      answer_card_id: DataTypes.INTEGER,
      round_id: DataTypes.INTEGER
    }, {
      timestamps: false,
    });
  return RoundAnswerCards;
  
};