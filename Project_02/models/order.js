const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Order = sequelize.define('Order', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  bookId: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'Books', key: 'id'}},
  quantity: {type: DataTypes.INTEGER, allowNull: false, validate: {min: 1}},
  userId: {type: DataTypes.INTEGER, allowNull: false, references: { model: 'Users', key: 'id' }},
});

module.exports = Order;
