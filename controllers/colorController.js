const Color = require("../models/colorsModel");
const asyncHandler = require("express-async-handler");

//@desc create color
//@route POST /color
//@access private

const createColor = asyncHandler(async (req, res) => {});

//@desc get all colors
//@route GET /color
//@access private
const getColors = asyncHandler(async (req, res) => {
  Color.findAll()
    .then((colors) => {
      res.status(200).json({ message: "colors fetched", colors });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to fetch colors " + error });
    });
});

module.exports = { createColor, getColors };
