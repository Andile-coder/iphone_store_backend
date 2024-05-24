const express = require("express");
const router = express.Router();
const {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const validateToken = require("../middleware/validateToken");

router.route("/").post(validateToken, createOrder).get(getOrders);
router
  .route("/:orderId")
  .get(getOrderById)
  .put(updateOrderStatus)
  .delete(deleteOrder);

module.exports = router;
