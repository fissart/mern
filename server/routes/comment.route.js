const { Router } = require("express");
const router = Router();

const {
  getTheme,
  createTheme,
  updateTheme,
  updateThemeget,
  deleteTheme,
  createComment,
  createComment2,
  getComment_User_Idtheme,
  getComments,
  deleteComment,
  updateCommentget,
  updateComment,
  // getU,
  // getUu,
  // deleteU,
} = require("../controllers/foro.controller");

// router.route("/comment/curse/:curse").get(getTheme);
// router.route("/comment/count/:idtheme/:user").get(getComment_User_Idtheme);
// router.route("/themes/:idtheme/:user").get(getComments);

router.route("/theme").post(createTheme);
router.route("/theme/:id").put(updateTheme);
router.route("/comment").post(createComment);
// router.route("/c2").post(createComment2);


// router.route("/theme/:idtheme").get(updateThemeget).put(updateTheme).delete(deleteTheme);

router.route("/theme/:id").delete(deleteTheme);
// router.route("/comment/:id").get(updateCommentget).put(updateComment);

module.exports = router;
