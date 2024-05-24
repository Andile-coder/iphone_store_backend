const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;

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

// create a new clodinary instance

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Export cloudinary configuration

module.exports = { sequelize, cloudinary };
