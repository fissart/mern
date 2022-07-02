const { Router } = require("express");
const router = Router();

const {
  getUu,
  createU,
  getU,
  deleteU,
  updateU,
  getCURSO,
  getLink,
  getupdateLink,
  createLink,
  updateLink,
  deleteLink
} = require("../controllers/curse.controller");

router.route("/").get(getUu).post(createU);

router.route("/:id").get(getU).delete(deleteU).put(updateU);
router.route("/cursosespecificos/:id").get(getCURSO);

///////////////////////////////////////////////////////////link



module.exports = router;
