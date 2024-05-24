const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { sequelize } = require("./config");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(cookieParser());
const corsOptions = {
  origin: ["http://localhost:5173", "https://localhost:5173"], // Allow your frontend's origin
  credentials: true, // Allow credentials (cookies)
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const imageRoutes = require("./routes/imageRoutes");
// const orderRoutes = require("./routes/orderRoutes");
app.use("/api", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/images", imageRoutes);
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
