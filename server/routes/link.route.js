const { Router } = require("express");
const router = Router();
const multer = require("multer")
const upload = multer({ dest: "./uploads/collections" })
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    // Get the extension (e.g., .png, .jpg)
    const ext = path.extname(file.originalname);
    // Create a unique name: fieldname-timestamp.extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const {
  getLink,
  getLinkCurse,
  mv,
  // getLink,
  // getupdateLink,
  createLink,
  getLinkNews,
  getLinkNewsw,
  updateLink,
  updateLinkwithoutfile,
  deleteLink
} = require("../controllers/link.controller");

router.route("/www/:idcurse").get(getLinkCurse)

router.route("/").post(upload.single("archivo"), createLink);
router.route("/lands").get(getLink).post(upload.single("foto"), createLink);
router.route("/lands/:id").put(upload.single("foto"), updateLink).delete(deleteLink);
router.route("/landswithoutfile/:id").put(updateLinkwithoutfile)
router.route("/lands/news").get(getLinkNews);
router.route("/lands/newsw").get(getLinkNewsw);
router.route("/lands/:id").get(mv);

module.exports = router;
