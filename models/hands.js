module.exports = function (sequelize, DataTypes) {
  
  const Hands = sequelize.define( "Hands",{
      player_id: DataTypes.INTEGER,
      answer_card_id: DataTypes.INTEGER
    },
    {
      timestamps: false,
    }
  );
  return Hands;
};