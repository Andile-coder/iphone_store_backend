const router = require("express").Router();
const {
  createCardInfo,
  getCardInfos,
} = require("../controllers/cardinfoController");

const validateToken = require("../middleware/validateToken");

router.post("/", validateToken, createCardInfo);
router.get("/", validateToken, getCardInfos);

module.exports = router;
