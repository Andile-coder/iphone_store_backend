const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
// const { generateUniqueID } = require("../middlewear/uniqueUser");
// const { constants } = require("../constants");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

//@desc register user
//@route POST /register
//@access public
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, phone } = req.body;
  const availableUser = await User.findOne({ where: { email } });
  if (availableUser) {
    res.status(400);
    throw new Error("User with email already registered");
  }

  if (!username || !email || !password || !phone) {
    res.status(400);
    throw new Error("Username, Email,Password and Phone are required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  User.create({
    user_id: uuidv4(), // Generate a new UUID
    username,
    email,
    phone,
    password: hashedPassword,
    status: "active",
    role: "user",
  })
    .then((user) => {
      res
        .status(201)
        .json({ message: "user created succesfully " + user.toJSON() });
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to create user " + error });
    });
});

//@desc login user
//@route POST /login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Missing user Credentials");
  }

  const user = await User.findOne({ where: { email } });

  //compare password

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          user_id: user.user_id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "59m" }
    );
    console.log("login successful");
    res.status(200).json({ accessToken });
    return;
  } else {
    // res.sendStatus(constants.UNAUTHORISED);
    throw new Error("Invalid User Credentials");
  }
});

//@desc current user
//@route get /current
//@access private

// const currentUser = asyncHandler(async (req, res) => {
//   if (!req.user) {
//     res.sendStatus(constants.UNAUTHORISED);
//     throw new Error("Invalid User Credentials");
//   }
//   res.status(200).json(req.user);
// });

const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);

  // Fetch user from the database
  const user = await User.findByPk(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Respond with the user data
  res.json(user);
});

const updatePassword = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const { currentPassword, newPassword } = req.body;

  // Fetch user from the database
  const user = await User.findByPk(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Check if the current password matches
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
  if (!isPasswordValid) {
    res.status(400);
    throw new Error("Current password is incorrect");
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password
  user.password = hashedPassword;
  await user.save();

  // Respond with a success message
  res.json({ message: "Password updated successfully" });
});

module.exports = { createUser, loginUser, getUser, updatePassword };
