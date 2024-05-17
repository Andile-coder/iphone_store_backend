const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
// const { generateUniqueID } = require("../middlewear/uniqueUser");
// const { constants } = require("../constants");
const { v4: uuidv4 } = require("uuid");

//@desc create product
//@route POST /product
//@access private

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image } = req.body;
  if (!name || !price || !description) {
    res.status(400);
    throw new Error("Name, Price, Description and Image are required");
  }

  Product.create({
    product_id: uuidv4(), // Generate a new UUID
    product_number: Math.floor(Math.random() * 1000000000),
    name,
    price,
    description,
    image,
  })
    .then((product) => {
      res
        .status(201)
        .json({ message: "product created succesfully " + product.toJSON() });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to create product " + error });
    });
});

//@desc get all products
//@route GET /product
//@access public
const getProducts = asyncHandler(async (req, res) => {
  Product.findAll()
    .then((products) => {
      res.status(200).json({ message: "products fetched", products });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to fetch products " + error });
    });
});

//@desc get single product
//@route GET /product/:productId
//@access public

const getProductById = asyncHandler(async (req, res) => {
  Product.findOne({ where: { product_id: req.params.productId } })
    .then((product) => {
      res.status(200).json({ message: "product fetched", product });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to fetch product " + error });
    });
});

//@desc update product
//@route PUT /product/:productId
//@access private

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image } = req.body;
  if (!name || !price || !description || !image) {
    res.status(400);
    throw new Error("Name, Price, Description and Image are required");
  }

  Product.update(
    {
      name,
      price,
      description,
      image,
    },
    { where: { product_id: req.params.productId } }
  )
    .then((product) => {
      res.status(200).json({ message: "product updated", product });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to update product " + error });
    });
});

//@desc delete product
//@route DELETE /product/:productId
//@access private

const deleteProduct = asyncHandler(async (req, res) => {
  Product.destroy({ where: { product_id: req.params.productId } })
    .then(() => {
      res.status(200).json({ message: "product deleted" });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to delete product " + error });
    });
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
