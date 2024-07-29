const express = require("express");
const router = express.Router();

// Load Controllers
const {
  neww,
  registerController,
  activationController,
  signinController,
  forgotPasswordController,
  resetPasswordController,
  googleController,
  facebookController,
} = require("../controllers/auth.controller");

const {
  validSign,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../helpers/valid")

router.post("/www", neww);
router.post("/register", registerController);
router.get("/login/:email/:password", signinController);
router.post("/activation", activationController);
//router.post("/www", neww);
//router.post("/register", validSign, registerController);
//router.post("/login", validLogin, signinController);
//router.post("/activation", activationController);

router.put(
  "/forgotpassword",
  forgotPasswordValidator,
  forgotPasswordController
);
router.put("/resetpassword", resetPasswordValidator, resetPasswordController);
// Google and Facebook Login
router.post("/googlelogin", googleController);
router.post("/facebooklogin", facebookController);
module.exports = router;
