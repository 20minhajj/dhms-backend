const express = require("express");
const router = express.Router();
const reservationCrtl = require("../controllers/reservation.controller");

router.post("/driver/reserv", reservationCrtl.makeResevation);

module.exports = router;
