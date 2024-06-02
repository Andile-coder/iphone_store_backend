const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");
const Color = require("./colorsModel");

// Define the User model that matches your existing table
const Image = sequelize.define("Image", {
  image_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    autoIncrement: false,
  },
  color_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    references: {
      model: Color,
      key: "color_id",
    },
  },
  url: {
    type: DataTypes.TEXT,
  },
  order: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Image;
