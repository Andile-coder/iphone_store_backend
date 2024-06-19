const ProductVariation = require("../models/productVariationModel");
const asyncHandler = require("express-async-handler");

const { v4: uuidv4 } = require("uuid");
const Product = require("../models/productModel");

//@desc create product
//@route POST /product
//@access private

const createProductVariation = asyncHandler(async (req, res) => {
  const { stock, color, images } = req.body;
  const { id } = req.params;
  if (!stock || !images || !color) {
    res.status(400);
    throw new Error("stock, color and Images are required");
  }
  if (!id) {
    res.status(400);
    throw new Error("Invalid Product id");
  }

  const productExists = Product.findByPk(id);

  if (!productExists) {
    res.status(400);
    throw new Error("Product id not found");
  }

  ProductVariation.create({
    id: uuidv4(), // Generate a new UUID
    color: color,
    product_id: id,
    stock,
    images,
  })
    .then((product) => {
      res.status(201).json({
        message: "Product variation created succesfully " + product.toJSON(),
      });
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: "Failed to create productVariation " + error });
    });
});

//@desc get all products
//@route GET /product
//@access public
const getProductVariations = asyncHandler(async (req, res) => {
  ProductVariation.findAll()
    .then((products) => {
      res.status(200).json({ message: "products fetched", products });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to fetch products " + error });
    });
});

const getProductVariationsByProductId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  ProductVariation.findAll({
    where: { product_id: id },
  })
    .then((products) => {
      res.status(200).json({ message: "products fetched", products });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to fetch products " + error });
    });
});

module.exports = {
  getProductVariations,
  createProductVariation,
  getProductVariationsByProductId,
};
