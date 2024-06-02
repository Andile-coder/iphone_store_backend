const express = require("express");
const router = express.Router();
const {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
  getOrdersByUserId,
} = require("../controllers/orderController");
const validateToken = require("../middleware/validateToken");

router.route("/").post(validateToken, createOrder).get(getOrders);
router
  .route("/:orderId")
  .get(getOrderById)

  .put(updateOrderStatus)
  .delete(deleteOrder);

router.route("/user/:id").get(validateToken, getOrdersByUserId);
module.exports = router;
