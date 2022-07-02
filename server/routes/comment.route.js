const { Router } = require("express");
const router = Router();

const {
  getTheme,
  createTheme,
  updateTheme,
  updateThemeget,
  deleteTheme,
  createComment1,
  createComment2,
getComment_User_Idtheme,
  getComments,
  deleteComment,
  updateCommentget,
  updateComment,
  // getU,
  // getUu,
  // deleteU,
} = require("../controllers/comment.controller");

router.route("/comment/curse/:curse").get(getTheme);
router.route("/comment/count/:idtheme/:user").get(getComment_User_Idtheme);
router.route("/").post(createTheme);
router.route("/themes/:idtheme/:user").get(getComments);

router.route("/c1").post(createComment1);
router.route("/c2").post(createComment2);


router.route("/:idtheme").get(updateThemeget).put(updateTheme).delete(deleteTheme);

router.route("/:id/:index").delete(deleteComment);
router.route("/comment/:id/:index").get(updateCommentget).put(updateComment);

module.exports = router;
