const express = require("express");
const router = express.Router();

const {
  getProductVariations,
  createProductVariation,
  getProductVariationsByProductId,
} = require("../controllers/productVariationController");

router.get("/", getProductVariations);
router.get("/:id", getProductVariationsByProductId);
router.post("/:id", createProductVariation);
module.exports = router;
