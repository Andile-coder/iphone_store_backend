const { DataTypes } = require("sequelize");
const sequelize = require("../config"); // Adjust the path to your sequelize instance
const Order = require("./orderModel");
const Product = sequelize.define("product", {
  product_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: false,
  },
  product_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
  },
  model: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
  },
  storage_capacity: {
    type: DataTypes.INTEGER, // In GB
  },
  ram: {
    type: DataTypes.INTEGER, // In GB
  },
  screen_size: {
    type: DataTypes.FLOAT, // In inches
  },
  operating_system: {
    type: DataTypes.STRING,
  },
  battery_capacity: {
    type: DataTypes.INTEGER, // In mAh
  },
  camera: {
    type: DataTypes.STRING,
  },
  image_url: {
    type: DataTypes.STRING,
  },

  // Define other attributes of the product as needed
});

module.exports = Product;
