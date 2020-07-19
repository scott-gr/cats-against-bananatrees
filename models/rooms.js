module.exports = function (sequelize, DataTypes) {
  const Rooms = sequelize.define("Rooms", {
    host_id: DataTypes.INTEGER,
    player_count: DataTypes.INTEGER,
    current_round_id: DataTypes.INTEGER,
  });

  // Rooms.associate = function (models) {
  //   Rooms.hasMany(models.Players, {
  //     onDelete: "cascade",
  //   });
  // };

  // Rooms.associate = function (models) {
  //   Rooms.hasMany(models.Rounds, {
  //     onDelete: "cascade",
  //   });
  // };

  // Rooms.associate = function (models) {
  //   Rooms.hasOne(models.Rounds, {
  //     onDelete: "cascade",
  //   });
  // };

  return Rooms;
};

