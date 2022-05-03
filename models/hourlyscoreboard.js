'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HourlyScoreboard extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HourlyScoreboard.belongsTo(models.Station, {foreignKey: 'station_id', as: 'station', onDelete: 'cascade'})
    }
  };
  HourlyScoreboard.init({
    station_id: DataTypes.INTEGER,
    business_date: DataTypes.STRING,
    time: DataTypes.STRING,
    actual: DataTypes.INTEGER,
    target: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'HourlyScoreboard',
  });
  return HourlyScoreboard;
};