const { Router } = require("express");
const router = Router();

const {
  createS,
  CreateDiploma,
  getDiploma,
  getTests,
  gett,
  getSTak,
  get,
  deleteS,
  updateS,
  UpdateTest,
  updaterestrictDatetaskSTD
} = require("../controllers/task.controller");

router.route('/Updaterestricted_date/:id')
    .post(updaterestrictDatetaskSTD);

router.route("/").post(createS);
router.route("/:user/:sec/:chap").get(gett);
// router.route("/:id").get(getSTak);
router.route("/:id").get(getSTak).delete(deleteS).put(updateS);

router.route("/test/:idtest").put(UpdateTest)
router.route("/test/diploma").post(CreateDiploma)
router.route("/test/diploma/get/:id").get(getDiploma)
router.route("/tests/new/:idcurse/:iduser").get(getTests)
router.route("/test/:id/:theme/:user").get(get);

module.exports = router;



