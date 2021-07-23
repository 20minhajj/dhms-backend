const express = require("express");
const router = express.Router();
const carCrtl = require("../controllers/car.controller");
const jwtVerify = require("../validation/userJWT");
router.post("/user/car/add", [jwtVerify.verifyUserJWT], carCrtl.addCar);
router.get("/user/car/list/:id", carCrtl.listCars);
router.get("/user/car/all", carCrtl.allCars);
router.delete("/user/car/delete/:id", carCrtl.deleteCar);
router.put("/user/car/update/:id", carCrtl.editCar);

module.exports = router;
