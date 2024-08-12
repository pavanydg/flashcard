const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const FlashCard = sequelize.define('FlashCard', {
    fid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    question: { type: DataTypes.STRING, allowNull: false },
    answer: { type: DataTypes.TEXT },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'admin',
            key: "admin_id"
        }
    },
}, {
    timestamps: false,
    tableName: 'flashcard'
});

module.exports = FlashCard;
