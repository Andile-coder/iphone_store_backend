const express = require("express");
const router = express.Router();

const {
  uploadImage,
  getProfilePicture,
  getImage,
  getImages,
} = require("../controllers/cloudinaryController");

router.route("/").post(uploadImage).get(getImages);
router.route("/:id").get(getProfilePicture);
router.route("/image/phones").get(getImage);

module.exports = router;
