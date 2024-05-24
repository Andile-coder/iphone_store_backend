const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const validateToken = require("../middleware/validateToken");

router.route("/").get(getProducts).post(createProduct);
router
  .route("/:productId")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
// Path: routes/userRoutes.js
