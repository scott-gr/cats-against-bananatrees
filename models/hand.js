module.exports = function (sequelize, DataTypes) {
  const Hand = sequelize.define(
    "Hand",
    {
      player_id: DataTypes.INTEGER,
      answer_card_id: DataTypes.INTEGER
    },
    {
      timestamps: false,
    }
  );
  return Hand;
};