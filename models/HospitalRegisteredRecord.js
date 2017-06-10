/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('HospitalRegisteredRecord', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    didRegist: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    doctor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lineId: {
      type: DataTypes.STRING(255),
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
    tableName: 'HospitalRegisteredRecord'
  });
};
