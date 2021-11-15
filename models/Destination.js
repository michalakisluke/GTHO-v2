const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User Model
class Destination extends Model {}


Destination.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        airportCode: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [4]
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        }  
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'destination'
    }
);

module.exports = Destination;