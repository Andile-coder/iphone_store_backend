// orderModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config"); // Adjust the path to your sequelize instance
const User = require("./userModel");

const Order = sequelize.define("Order", {
  order_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false, // Adjust as per your requirements
    // Add any other constraints or references to Customer model if needed
    references: {
      model: User,
      key: "user_id",
    },
  },
  date_placed: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Order;
