const { Router } = require("express");
const router = Router();

const {
  getUu,
  createU,
  getU,
  getUwww,
  deleteU,
  updateU,
} = require("../controllers/chat.controller");

router.route("/").get(getUu).post(createU);

router.route("/:id").get(getU).delete(deleteU).put(updateU);
router.route("/:ciclo/:mencion/:year").get(getUwww)

module.exports = router;
