const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");
const User = require("./userModel");

const Address = sequelize.define("Address", {
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
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  suburb: {
    type: DataTypes.STRING,
  },
  postal_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  building: {
    type: DataTypes.STRING,
  },
  is_default: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Address;
