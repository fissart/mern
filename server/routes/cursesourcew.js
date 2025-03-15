const express = require("express");
const router = express.Router();

// // import controller
// const {
//   requireSignin,
//   adminMiddleware,
// } = require("../controllers/cursesourcew.controller");
const {
  gett
  // usersController,
  // readController,
  // updateController,
  // usersId,
  // usersCr,
  // usersUp,
  // getAllUsers,
  // DelUser,
} = require("../controllers/cursesourcew.controller");

 router.get("/", gett);
// router.get("/user/", requireSignin, usersController);
// router.get("/users/:user", usersController, usersId);
// router.get("/userId/:id", usersId);
// router.delete("/userId/:id", DelUser);
// router.put("/userUp/:id", usersUp);
// router.post("/userCr/", usersCr);
// router.get("/user/:id", readController);
// router.put("/user/update", requireSignin, updateController);
// router.put("/admin/update", requireSignin, adminMiddleware, updateController);

module.exports = router;
