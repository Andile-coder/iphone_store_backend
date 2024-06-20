const express = require("express");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { sequelize } = require("./config");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3001;
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: ["http://localhost:5173", "https://localhost:5173"], // Allow your frontend's origin
  credentials: true, // Allow credentials (cookies)
};
app.use(cors(corsOptions));
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const imageRoutes = require("./routes/imageRoutes");
const colorRoutes = require("./routes/colorRoutes");
const cloudinaryRoutes = require("./routes/cloudinaryRoutes");
const addressRoutes = require("./routes/addressRoutes");
const cardInfoRoutes = require("./routes/cardInfoRoutes");
const productVariationRoutes = require("./routes/productVariationsRoutes");

app.use("/api", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/colors", colorRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/card", cardInfoRoutes);
app.use("/api/product_variations", productVariationRoutes);
sequelize
  .sync({ alter: true }) // alter: true updates the schema if it changes; remove for production
  .then(() => {
    console.log("Database & tables created!");
    // Start the server
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
