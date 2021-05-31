const express = require("express");

const router = express.Router();

const addCarCtrl = require("../controllers/car.controller");
const listCarCrtl = require("../controllers/car.controller");
const deleteCarCtrl = require("../controllers/car.controller");
const editCarCtrl = require("../controllers/car.controller");

router.post("/user/car/add", addCarCtrl.addCar);
router.get("/user/car/list", listCarCrtl.listCars);
router.delete("/user/car/delete/:id", deleteCarCtrl.deleteCar);
router.put("/user/car/update/:id", editCarCtrl.editCar);

module.exports = router;
