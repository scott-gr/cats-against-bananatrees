module.exports = function (sequelize, DataTypes) {
  const AnswerCards = sequelize.define(
    'AnswerCards',
    {
      id: DataTypes.INTEGER,
      text: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  return AnswerCards;
};


