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
  const { username, email, password, phone, first_name, last_name } = req.body;
  const availableUser = await User.findOne({ where: { email } });
  if (availableUser) {
    res.status(400);
    throw new Error("User with email already registered");
  }

  if (!username || !email || !password || !phone || !first_name || !last_name) {
    res.status(400);
    throw new Error("Username, Email,Password and Phone are required");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  User.create({
    user_id: uuidv4(), // Generate a new UUID
    username,
    email,
    phone,
    first_name,
    last_name,
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
        user,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "59m" }
    );
    // update last login
    user.last_login = new Date();
    await user.save();
    console.log("process.env.PRODUCTION",process.env.PRODUCTION);
    res
      .cookie("token", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        Path: "/", // set the cookie for all routes
        maxAge: 3600000,
        secure:process.env.PRODUCTION
      })
      .send({ user, token: accessToken });
    res.status(200).json({ user, token: accessToken }); // token should only be for testing
  } else {
    // res.sendStatus(constants.UNAUTHORISED);
    res.status(401).json({ message: "Invalid email or password" });
  }
});

const getUserById = asyncHandler(async (req, res) => {
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

//@desc update user
//@route PATCH /user
//@access private

const updateUser = asyncHandler(async (req, res) => {
  const { username, email, phone, first_name, last_name } = req.body;
  const { user_id } = req.user;

  // Fetch user from the database
  const user = await User.findByPk(user_id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Update the user's data
  user.username = username;
  user.email = email;
  user.phone = phone;
  user.first_name = first_name;
  user.last_name = last_name;

  await user.save();

  // Respond with a success message
  res.status(201).json({ message: "User updated successfully" });
});

const getUser = asyncHandler(async (req, res) => {
  const { user_id } = req.user;
  // Fetch user from the database
  const user = await User.findByPk(user_id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  // Respond with the user data
  res.status(200).json(user);
});
const updatePassword = asyncHandler(async (req, res) => {
  const { old_password, new_password, user_id } = req.body;

  // Fetch user from the database
  const user = await User.findByPk(user_id);

  if (!user) {
    res.status(404).send("User not found"); // Respond with a 404 status code and message
    throw new Error("User not found");
  }

  // Check if the current password matches
  const isPasswordValid = await bcrypt.compare(old_password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ message: "Current password is incorrect" }); // Respond with a 400 status code and message
    // throw new Error("Current password is incorrect");
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(new_password, 10);

  // Update the user's password
  user.password = hashedPassword;
  await user.save();

  // Respond with a success message
  res.status(201).json({ message: "Password updated successfully" });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token"); // Clear the token cookie
  res.status(200).json({ message: "Logged out successfully" }); // Send a structured JSON response with a status code
});
module.exports = {
  createUser,
  loginUser,
  getUserById,
  getUser,
  updatePassword,
  logout,
  updateUser,
};
