const { Router } = require("express");
const router = Router();

const {
  getUu,
  createU,
  getNuser,
  getU,
  deleteU,
  updateU,
  getCURSO,
} = require("../controllers/mycurse.controller");

router.route("/").get(getUu).post(createU);
router.route("/www/:id/:user").get(getU);
router.route("/:user").get(getNuser);
router.route("/:id").delete(deleteU).put(updateU);
//router.route("/cursosespecificos/:id").get(getCURSO);

module.exports = router;
