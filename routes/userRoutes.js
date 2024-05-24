const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getUser,
  updatePassword,
  getUserById,
  logout,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");
// const validateToken = require("../middlewear/validateToken");
router.post("/auth/login", loginUser);

router.post("/auth/register", createUser);
router.post("/auth/logout", logout);
//get user
router.get("/auth/user/:userId", validateToken, getUserById);
router.get("/auth/user", validateToken, getUser);

//update password
router.put("/auth/user/:userId", updatePassword);

// router.get("/user", validateToken, currentUser);

// router.route("/logout").get((req, res) => {
//   res.send({ message: "logout user" });
// });

module.exports = router;
