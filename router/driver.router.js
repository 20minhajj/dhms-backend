const express = require("express");
const multer = require("multer");
const verfy = require("../validation/emailValidation");

const router = express.Router();

const registrationCtrl = require("../controllers/driver.controller");
const loginCtrl = require("../controllers/driver.controller");
const profilePicCtrl = require("../controllers/driver.controller");

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
  "/driver/auth/signup",
  [verfy.checkDuplicateDriverEmail],
  registrationCtrl.registration
);
router.post("/driver/auth/signin", loginCtrl.signin);
router.put(
  "/driver/setProfile/:id",
  uploadProfile.single("image"),
  profilePicCtrl.setProfilePic
);

module.exports = router;
