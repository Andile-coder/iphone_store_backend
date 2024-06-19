const { DataTypes } = require("sequelize");
const { sequelize } = require("../config"); // Adjust the path to your sequelize instance
const Product = require("./productModel");
const ProductVariation = sequelize.define("productVariation", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: false,
  },
  product_id: {
    type: DataTypes.UUID,
    allowNull: false, // Adjust as per your requirements
    // Add any other constraints or references to Customer model if needed
    references: {
      model: Product,
      key: "product_id",
    },
  },
  color: {
    type: DataTypes.STRING,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: {},
  },
});

module.exports = ProductVariation;
