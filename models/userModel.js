const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");

// Define the User model that matches your existing table
const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: false,
    },
    username: {
      type: DataTypes.STRING(50),
    },
    first_name: {
      type: DataTypes.STRING(50),
    },
    last_name: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(100),
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    password: {
      type: DataTypes.STRING(100),
    },
    status: {
      type: DataTypes.STRING(50),
    },
    role: {
      type: DataTypes.STRING(50),
    },
    last_login: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "users", // Specify the table name
    timestamps: true, // Disable automatic timestamps if you're managing them manually
  }
);

module.exports = User;
