const express = require("express");
const router = express.Router();
const multer = require("multer")
const upload = multer({ dest: "./uploads/collections" })

// import controller
const {
  requireSignin,
  adminMiddleware,
} = require("../controllers/auth.controller");
const {
  usersController,
  readController,
  updateController,
  usersstdController,
  usersId,
  getReport,
  getAveragesStd,
  usersCr,
  getAveragesStdNative,
  usersUp,
  getAllUsers,
  DelUser,
} = require("../controllers/user.controller");

router.route("/:ciclo/:mencion/:year").get(getReport)
router.route("/stdaverages/:mencion/:ciclo/:year/:codigo").get(getAveragesStd)
router.route("/stdaveragesnative/:id").get(getAveragesStdNative)
router.get("/userAll/:rol", getAllUsers);
router.get("/stdnotes/:id", usersstdController);
router.put("/user/:id", upload.single("foto"), usersUp).get("/user/:id", readController);
router.get("/userCr", usersCr);
// router.get("/userId/:id", usersId);
// router.get("/user/", requireSignin, usersController);
// router.delete("/userId/:id", DelUser);
// router.put("/user/update", requireSignin, updateController);
// router.put("/admin/update", requireSignin, adminMiddleware, updateController);

module.exports = router;
