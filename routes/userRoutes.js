const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controllers/userController");
// const validateToken = require("../middlewear/validateToken");
router.post("/auth/login", loginUser);

router.post("/auth/register", createUser);

// router.get("/user", validateToken, currentUser);

// router.route("/logout").get((req, res) => {
//   res.send({ message: "logout user" });
// });

module.exports = router;
