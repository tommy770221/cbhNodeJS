module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Comment', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        doctor_id: {
            type: DataTypes.INTEGER(6),
            allowNull: true
        },
        create_time: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        rating: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            defaultValue: '5'
        },
        address: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        contract_address: {
            type: DataTypes.STRING(45),
            allowNull: true
        }
    }, {
        tableName: 'comment'
    });
};