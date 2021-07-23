const express = require("express");
const verfy = require("../validation/emailValidation");

const router = express.Router();

const driverCtrl = require("../controllers/driver.controller");

router.post(
  "/driver/auth/signup",
  [verfy.checkDuplicateDriverEmail],
  driverCtrl.registration
);
router.post("/driver/auth/signin", driverCtrl.signin);
router.put("/driver/setProfile/:id", driverCtrl.setProfilePic);
router.get("/driver/call/:id", driverCtrl.oneDriver);
router.delete("/driver/delete/:id", driverCtrl.deleteDriver);
router.put("/driver/editinfo/:id", driverCtrl.editDriver);
router.get('/driver/profile', driverCtrl.profile)
router.get('/driver/all', driverCtrl.allDrivers)
module.exports = router;
