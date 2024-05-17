const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
// const { generateUniqueID } = require("../middlewear/uniqueUser");
// const { constants } = require("../constants");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

//@desc create order
//@route POST /order
//@access private
