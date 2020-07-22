module.exports = function (sequelize, DataTypes) {
  const Rooms = sequelize.define(
    "Rooms",
    {
      host_id: DataTypes.INTEGER,
      player_count: DataTypes.INTEGER,
      current_round_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );
  return Rooms;
};
