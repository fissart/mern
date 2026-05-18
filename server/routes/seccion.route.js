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

router.route("/:id").delete(deleteS).put(updateS)
router.route("/").get(getS).post(createS);
// router.route("/file").post(file);

router.route("/:id/:curssse/:iduser").get(getSs);
router.route("/updateSFromStudent/:id").put(updateSfromStudent);
router.route("/cursosespecificos/:chap").get(getSS);

module.exports = router;
