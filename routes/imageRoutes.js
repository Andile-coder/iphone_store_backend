const express = require("express");
const router = express.Router();

const { getImages } = require("../controllers/imageController");
router.route("/").get(getImages);
module.exports = router;
