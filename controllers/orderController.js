const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
// const { generateUniqueID } = require("../middlewear/uniqueUser");
// const { constants } = require("../constants");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

//@desc create order
//@route POST /order
//@access private

const createOrder = asyncHandler(async (req, res) => {
  const { user_id, products, quantity, total_amount } = req.body;
  if (!user_id || !products || !total_amount) {
    res.status(400);
    throw new Error("User ID, Product ID, Quantity and Total are required");
  }

  Order.create({
    order_id: uuidv4(), // Generate a new UUID
    order_number: Math.floor(Math.random() * 1000000000),
    user_id,
    products,
    quantity,
    total_amount,
  })
    .then((order) => {
      res
        .status(201)
        .json({ message: "order created succesfully " + order.toJSON() });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to create order " + error });
    });
});

//@desc get all orders
//@route GET /order
//@access private
const getOrders = asyncHandler(async (req, res) => {
  Order.findAll()
    .then((orders) => {
      res.status(200).json({ message: "orders fetched", orders });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to fetch orders " + error });
    });
});

//@desc get single order
//@route GET /order/:orderId
//@access private

const getOrderById = asyncHandler(async (req, res) => {
  Order.findOne({ where: { order_id: req.params.orderId } })
    .then((order) => {
      res.status(200).json({ message: "order fetched", order });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to fetch order " + error });
    });
});

//@desc update order
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!status) {
    res.status(400);
    throw new Error("Status is required");
  }
  Order.update({ status }, { where: { order_id: req.params.orderId } });
});

//@desc delete order
//@route DELETE /order/:orderId
//@access private

const deleteOrder = asyncHandler(async (req, res) => {});

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
