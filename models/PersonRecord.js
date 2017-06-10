/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PersonRecord', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    currentStatus: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    latitude: {
      type: "DOUBLE",
      allowNull: true
    },
    lineId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    longtitude: {
      type: "DOUBLE",
      allowNull: true
    },
    symptom: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    userName: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'PersonRecord'
  });
};
