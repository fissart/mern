const { Router } = require("express");
const router = Router();

const {
  getTest,
  createTest,
  getupdateTest,
  deleteTest,
  updateTest,
  getTestResp,
  createTestResp,
  getupdateTestResp,
  deleteTestResp,
  updateTestResp,
} = require("../controllers/test.controller");

router.route("/").get(getTest).post(createTest);
router.route("/:id").get(getupdateTest).delete(deleteTest).put(updateTest);

router.route("/respuesta/").get(getTestResp).post(createTestResp);
router.route("/respuesta/:id").delete(deleteTestResp).put(updateTestResp);
router.route("/respuesta/:idtest/:user").get(getTestResp);
module.exports = router;
