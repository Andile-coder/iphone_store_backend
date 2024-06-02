const express = require("express");
const router = express.Router();
const { createColor, getColors } = require("../controllers/colorController");
const validateToken = require("../middleware/validateToken");

router.route("/").get(getColors);

module.exports = router;
