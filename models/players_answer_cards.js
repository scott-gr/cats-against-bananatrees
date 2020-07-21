module.exports = function (sequelize, DataTypes) {
  
  const PlayersAnswerCards = sequelize.define("PlayersAnswerCards", {
      player_id: DataTypes.INTEGER,
      answer_card_id: DataTypes.INTEGER
    }, {
      timestamps: false,
    });
  return PlayersAnswerCards;
  
};