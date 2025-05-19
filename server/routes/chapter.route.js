const { Router } = require("express");
const router = Router();

const {
  getC,
  createC,
  getCc,
  deleteC,
  updateC,
  deleteItems,
  getCC,
} = require("../controllers/chapter.controller");

router.route("/").get(getC).post(createC);

router.route("/:id").get(getCc).delete(deleteC).put(updateC);


router.route("/www/:user/:categ").get(getCC);

module.exports = router;
