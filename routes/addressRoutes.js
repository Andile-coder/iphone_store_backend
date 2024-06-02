const express = require("express");
const router = express.Router();
const {
  createAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");
const validateToken = require("../middleware/validateToken");

router.post("/", validateToken, createAddress);
router.get("/", validateToken, getAddresses);
router.patch("/:id", validateToken, updateAddress);
router.delete("/:id", validateToken, deleteAddress);

module.exports = router;
