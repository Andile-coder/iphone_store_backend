const express = require("express");
const router = express.Router();

const {
  uploadImage,
  getImage,
} = require("../controllers/cloudinaryController");

router.route("/").post(uploadImage);
router.route("/:id").get(getImage);

module.exports = router;
