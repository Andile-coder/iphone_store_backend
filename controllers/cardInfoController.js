const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const CardInfo = require("../models/cardInfoModel");
const User = require("../models/userModel");

// @desc    Create new card info
// @route   POST /cardinfo
// @access  Private

const createCardInfo = asyncHandler(async (req, res) => {
  const { card_number, card_holder, expiration_date, cvv, is_default } =
    req.body;

  const user_id = req.user.user_id;
  const user = await User.findOne({ where: { user_id } });
  if (!user) {
    res.status(400);
    throw new Error("Can't create card info for null user");
  }

  if (!card_number || !card_holder || !expiration_date || !cvv) {
    res.status(400);
    throw new Error("All fields are required");
  }
  CardInfo.create({
    id: uuidv4(),
    user_id,
    card_number,
    card_holder,
    expiration_date,
    cvv,
    is_default: true,
  })
    .then((cardinfo) => {
      res.status(201).json({ message: "Card info created successfully" });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to create card info " + error });
    });
});

// @desc    Get all card infos
// @route   GET /cardinfo
// @access  Private

const getCardInfos = asyncHandler(async (req, res) => {
  const user_id = req.user.user_id;
  const cardinfos = await CardInfo.findAll({ where: { user_id } });
  res.json(cardinfos);
});

module.exports = { createCardInfo, getCardInfos };
