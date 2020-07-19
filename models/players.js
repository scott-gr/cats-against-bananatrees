module.exports = function (sequelize, DataTypes) {
  const Players = sequelize.define(
    "Players",
    {
      name: DataTypes.STRING,
      socket_id: DataTypes.INTEGER,
      points: DataTypes.INTEGER,
      room_id: DataTypes.INTEGER
    },
    {
      timestamps: false,
    }
  );
  return Players;
};