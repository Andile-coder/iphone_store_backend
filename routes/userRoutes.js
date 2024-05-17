const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getUser,
  updatePassword,
} = require("../controllers/userController");
// const validateToken = require("../middlewear/validateToken");
router.post("/auth/login", loginUser);

router.post("/auth/register", createUser);
//get user
router.get("/auth/user/:userId", getUser);
//update password
router.put("/auth/user/:userId", updatePassword);

// router.get("/user", validateToken, currentUser);

// router.route("/logout").get((req, res) => {
//   res.send({ message: "logout user" });
// });

module.exports = router;
