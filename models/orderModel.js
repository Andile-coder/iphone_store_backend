// orderModel.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config"); // Adjust the path to your sequelize instance
const User = require("./userModel");
const Product = require("./productModel");

const Order = sequelize.define("order", {
  id: {
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
  },
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  shipping_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  items_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  products: {
    type: DataTypes.JSONB, // Store product data as JSONB
    allowNull: false,
    defaultValue: [], // Default value as empty array
  },
  order_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_address: {
    type: DataTypes.JSONB, // Store address data as JSONB
  },
});

module.exports = Order;
