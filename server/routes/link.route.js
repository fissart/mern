const { Router } = require("express");
const router = Router();

const {
  getLink,
  getupdateLink,
  createLink,
  updateLink,
  deleteLink
} = require("../controllers/link.controller");

router.route("/").post(createLink);
router.route("/www/:idcurso").get(getLink);
router.route("/:id").get(getupdateLink).delete(deleteLink);
router.route("/:id").put(updateLink);

module.exports = router;
