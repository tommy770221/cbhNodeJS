module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Comments', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        doctor_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {tableName: 'comments'});
};