const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");
const Product = require("./productModel");

// Define the User model that matches your existing table
const Color = sequelize.define("Color", {
  color_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: false,
  },
  product_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    references: {
      model: Product,
      key: "product_id",
    },
  },
  name: {
    type: DataTypes.STRING(50),
  },
});

module.exports = Color;
