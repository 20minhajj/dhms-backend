const express = require("express");
const multer = require("multer");
const verfy = require("../validation/emailValidation");

const router = express.Router();

const registrationCtrl = require("../controllers/user.controller");
const loginCtrl = require("../controllers/user.controller");
const profilePicCtrl = require("../controllers/user.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    cb(null, fileName + "-" + Date.now());
  },
});

const uploadProfile = multer({ storage: storage });

router.post(
  "/user/auth/signup",
  registrationCtrl.registration
);
router.post("/user/auth/signin", loginCtrl.signin);
router.put(
  "/user/setProfile/:id",
  uploadProfile.single("image"),
  profilePicCtrl.setProfilePic
);

module.exports = router;
