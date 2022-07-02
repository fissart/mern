const { Router } = require("express");
const router = Router();

const {
  create,
  gett,
  get,
  deleteS,
  updateS,
  getSSW,
} = require("../controllers/task.controller");

router.route("/").post(create);
router.route("/:user/:sec/:chap").get(gett);

router.route("/:id").get(get).delete(deleteS).put(updateS);

module.exports = router;
