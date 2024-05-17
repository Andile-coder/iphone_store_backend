const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Create a new Sequelize instance
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "postgres", // Correctly specify the dialect as 'postgres'
    define: {
      timestamps: true, // Enable automatic timestamps
      createdAt: "created_on", // Specify the column name for createdAt
      updatedAt: "last_updated_on", // Specify the column name for updatedAt
    },
  }
);

module.exports = sequelize;
