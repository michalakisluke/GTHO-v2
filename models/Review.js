const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User Model
class Review extends Model {}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model:'user',
                key: 'id'
            }
        },
        destination_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model:'destination',
                key: 'id'
            }
        }  
    },
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'review'
});

module.exports = Review;