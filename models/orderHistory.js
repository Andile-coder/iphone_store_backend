// orderHistoryModel.js
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");

const Order = require("./orderModel"); // Import the Order model

const OrderHistory = sequelize.define("OrderHistory", {
  history_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: false,
  },
  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Order,
      key: "order_id",
    },
  },
  change_description: {
    type: DataTypes.STRING, // You can adjust the data type based on your requirements
    allowNull: false,
  },
  // You can include more attributes related to order history if needed
});

module.exports = OrderHistory;
