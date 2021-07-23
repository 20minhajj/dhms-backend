const express = require("express");
const multer = require("multer");
const verfy = require("../validation/emailValidation");
const roleVerify = require("../validation/rolesValidation");
const passVfy = require("../validation/passwordVliadation");

const router = express.Router();

const userCTRL = require("../controllers/user.controller");

router.post(
  "/user/auth/signup",
  [
    verfy.checkDuplicateUserEmail,
    passVfy.passValidation,
    roleVerify.checkRolesExisted,
  ],
  userCTRL.registration
);
router.post("/user/auth/signin", userCTRL.signin);
router.put("/user/setProfile/:id", userCTRL.setProfilePic);
router.put("/user/editinfo/:id", userCTRL.editUser);
router.delete("/user/delete/id", userCTRL.deleteUser);
router.get("/user/oneuser/:id", userCTRL.oneUser);
router.get("/user/callusers", userCTRL.allUsers);
router.get("/user/profile", userCTRL.profile);
router.post("/user/logout", userCTRL.logout);
router.put("/user/changeRole/:id", userCTRL.changeRole);

module.exports = router;
