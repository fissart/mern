const { Router } = require("express");
const router = Router();
const multer = require("multer")
const upload = multer({ dest: "./uploads/collections" })

const {
  getUu,
  createU,
  getU,
  deleteU,
  updateU,
  updateUcurse,
  getCURSOUser,
  getCURSOCulqui,
  getCURSOThemes,
  getCURSOstd,
  CreateCURSOCulqui,
  GenerateCURSOCulqui,
  getGenerateCURSOCulqui,
  deleteUGenerate,
  getCURSOSources,
  GenerateAverage,
  RemoveAverage,
  updateLink,
  deleteLink
} = require("../controllers/curse.controller");

router.route("/").get(getUu).post(createU);

router.route("/curse/:id").put(updateUcurse);
router.route("/generate/:id").delete(deleteUGenerate)
router.route("/:id").get(getU).delete(deleteU).put(upload.single("img"), updateU);
router.route("getCursesStd/:id").get(getCURSOstd);
router.route("/cursossources/:mencion/:ciclo").get(getCURSOSources);
router.route("/cursosespecificos/:iduser/:true/:source").get(getCURSOUser);

router.route("/cursosculqui/:type").get(getCURSOCulqui);
router.route("/Getgeneratecursosculqui/:user/:true").get(getGenerateCURSOCulqui);
router.route("/cursosculqui").post(CreateCURSOCulqui);
router.route("/generatecursosculqui").post(GenerateCURSOCulqui);
router.route("/average").post(GenerateAverage);
router.route("/average/:id").delete(RemoveAverage);

router.route('/ControllerAll/:id/:idw').get(getCURSOThemes)
///////////////////////////////////////////////////////////link




module.exports = router;
