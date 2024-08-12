const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Admin = sequelize.define('Admin', {
    aid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: { type: DataTypes.STRING, allowNull: false },
    email: {type: DataTypes.STRING,allowNull: false},
    password: { type: DataTypes.TEXT },
}, {
    timestamps: false,
    tableName: 'admin'
});

module.exports = Admin;
