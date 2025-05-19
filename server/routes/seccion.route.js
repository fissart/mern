const { Router } = require("express");
const router = Router();

const {
  getS,
  createS,
  getSs,
  deleteS,
  updateS,
  updateSfromStudent,
  getSS,
  file
} = require("../controllers/seccion.controller");

router.route("/").get(getS).post(createS);
router.route("/file").post(file);

router.route("/:id/:curssse").get(getSs).delete(deleteS).put(updateS);
router.route("/updateSFromStudent/:id").put(updateSfromStudent);
router.route("/cursosespecificos/:chap").get(getSS);

module.exports = router;
