const { Router } = require("express");
const router = Router();

const {
  createS,
  gett,
  get,
  deleteS,
  updateS,
  getSSW,
  updaterestrictDatetaskSTD
} = require("../controllers/task.controller");

router.route('/Updaterestricted_date/:id')
    .post(updaterestrictDatetaskSTD);

router.route("/").post(createS);
router.route("/:user/:sec/:chap").get(gett);

router.route("/:id").get(get).delete(deleteS).put(updateS);

module.exports = router;
