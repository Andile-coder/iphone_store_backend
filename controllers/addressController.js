const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const Address = require("../models/addressModel");
const User = require("../models/userModel");

// @desc    Create new address
// @route   POST /address
// @access  Private

const createAddress = asyncHandler(async (req, res) => {
  const {
    address,
    city,
    state,
    country,
    postal_code,
    phone,
    suburb,
    building,
    is_default,
  } = req.body;

  const user_id = req.user.user_id;
  const user = await User.findOne({ where: { user_id } });
  if (!user) {
    res.status(400);
    throw new Error("Can't create address for null user");
  }

  if (!address || !city || !state || !country || !postal_code || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }
  Address.create({
    id: uuidv4(),
    user_id,
    address,
    city,
    state,
    country,
    postal_code,
    phone,
    suburb,
    building,
    is_default: true,
  })
    .then((address) => {
      res.status(201).json({ message: "Address created successfully" });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to create address " + error });
    });
});

// @desc    Get all addresses
// @route   GET /address
// @access  Private

const getAddresses = asyncHandler(async (req, res) => {
  const user_id = req.user.user_id;
  const addresses = await Address.findAll({ where: { user_id } });
  if (!addresses) {
    res.status(404);
    throw new Error("No addresses found");
  }
  res.status(200).json(addresses);
});

// @desc    Get address by ID
// @route   GET /address/:id
// @access  Private

const getAddressById = asyncHandler(async (req, res) => {
  const user_id = req.user.user_id;
  const address_id = req.params.id;
  const address = await Address.findOne({ where: { id: address_id, user_id } });
  if (!address) {
    res.status(404);
    throw new Error("Address not found");
  }
  res.status(200).json(address);
});

// @desc    Update address
// @route   PATCH /address/:id
// @access  Private

const updateAddress = asyncHandler(async (req, res) => {
  const user_id = req.user.user_id;
  const address_id = req.params.id;
  const {
    address,
    city,
    state,
    country,
    postal_code,
    phone,
    suburb,
    building,
    is_default,
  } = req.body;

  const availableAddress = await Address.findOne({
    where: { id: address_id, user_id },
  });
  if (!availableAddress) {
    res.status(404);
    throw new Error("Address not found");
  }

  Address.update(
    {
      address,
      city,
      state,
      country,
      postal_code,
      phone,
      suburb,
      building,
      is_default,
    },
    { where: { id: address_id, user_id } }
  )
    .then((address) => {
      res.status(201).json({ message: "Address updated successfully" });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to update address " + error });
    });
});

// @desc    Delete address
// @route   DELETE /address/:id
// @access  Private

const deleteAddress = asyncHandler(async (req, res) => {
  const user_id = req.user.user_id;
  const address_id = req.params.id;
  const address = await Address.findOne({ where: { id: address_id, user_id } });
  if (!address) {
    res.status(404);
    throw new Error("Address not found");
  }
  Address.destroy({ where: { id: address_id, user_id } })
    .then(() => {
      res.status(200).json({ message: "Address deleted successfully" });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to delete address " + error });
    });
});

module.exports = {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
};
