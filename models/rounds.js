module.exports = function (sequelize, DataTypes) {
  const Rounds = sequelize.define(
    "Rounds",
    {
      game_round: DataTypes.INTEGER,
      current_status: DataTypes.INTEGER,
      judge_id: DataTypes.INTEGER,
      question_card_id: DataTypes.INTEGER,
      room_id: DataTypes.INTEGER,
      winner_id: DataTypes.INTEGER
    },
    {
      timestamps: false,
    }
  );
  return Rounds;
};
