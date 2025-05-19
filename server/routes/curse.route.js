const { Router } = require("express");
const router = Router();

const {
  getUu,
  createU,
  getU,
  deleteU,
  updateU,
  getCURSOUser,
  getCURSOThemes,
  getCURSOstd,
  getLink,
  getupdateLink,
  createLink,
  updateLink,
  deleteLink
} = require("../controllers/curse.controller");

router.route("/").get(getUu).post(createU);

router.route("/:id").get(getU).delete(deleteU).put(updateU);
router.route("getCursesStd/:id").get(getCURSOstd);
router.route("/cursosespecificos/:iduser/:true").get(getCURSOUser);
router.route('/ControllerAll/:id/:idw')
  .get(getCURSOThemes)
///////////////////////////////////////////////////////////link




module.exports = router;
