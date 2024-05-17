const express = require("express");
const dotenv = require("dotenv").config();
const sequelize = require("./config");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
// const orderRoutes = require("./routes/orderRoutes");
app.use("/api", userRoutes);
app.use("/api/products", productRoutes);
sequelize
  .sync({ alter: true }) // alter: true updates the schema if it changes; remove for production
  .then(() => {
    console.log("Database & tables created!");
    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
