const { cloudinary } = require("../config");
const asyncHandler = require("express-async-handler");
const Image = require("../models/imageModel");
// receive image from the client and save it to cloudinary

const getImages = asyncHandler(async (req, res) => {
  console.log("request", req.body);
  const images = await Image.findAll();
  res.json(images);
});

module.exports = { getImages };
