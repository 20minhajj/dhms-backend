const express = require("express");

const router = express.Router();

const registrationCtrl = require("../controllers/driver.controller");
const loginCtrl = require("../controllers/driver.controller");

router.post("/driver/auth/signup", registrationCtrl.registration);
router.post("/driver/auth/signin", loginCtrl.signin)

module.exports = router;
