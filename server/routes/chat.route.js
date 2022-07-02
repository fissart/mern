const { Router } = require("express");
const router = Router();

const {
  getUu,
  createU,
  getU,
  deleteU,
  updateU,
} = require("../controllers/chat.controller");

router.route("/").get(getUu).post(createU);

router.route("/:id").get(getU).delete(deleteU).put(updateU);

module.exports = router;
