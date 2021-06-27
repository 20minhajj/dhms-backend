const express = require("express");
const router = express.Router();
const offersCrtl = require("../controllers/offer.controller");

router.post("/user/offer/add",  offersCrtl.addOffer);
router.get("/user/car/list", offersCrtl.listOffers);
router.delete("/user/car/delete/:id", offersCrtl.deleteOffer);
router.put("/user/car/update/:id", offersCrtl.editOffer);

module.exports = router;
