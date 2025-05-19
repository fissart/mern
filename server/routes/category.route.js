const { Router } = require("express");
const router = Router();

const {
  getUu,
  createU,
  getU,
  deleteU,
  updateU,
  getCateg,
} = require("../controllers/category.controller");

router.route("/").post(createU);
router.route("/categcurseuser/:iduser/:true").get(getUu);
router.route("/:id").get(getU).delete(deleteU).put(updateU);
router.route("/:categ/:user").get(getCateg);

module.exports = router;
