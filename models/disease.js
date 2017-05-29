/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Disease', {
    doc_category: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    big_category: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    symptom: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'disease'
  });
};
