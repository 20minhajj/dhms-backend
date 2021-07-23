const express = require("express");
const router = express.Router();
const offersCrtl = require("../controllers/offer.controller");

router.post("/user/offer/add",  offersCrtl.addOffer);
router.get("/user/offer/list", offersCrtl.listOffers);
router.get("/user/offer/open", offersCrtl.openOffers);
router.get("/user/offer/closed", offersCrtl.closedOffers);
router.delete("/user/offerDelete/:id", offersCrtl.deleteOffer);
router.put("/user/offer/update/:id", offersCrtl.editOffer);
router.put("/user/offer/accept/:id", offersCrtl.acceptOffer);
router.get("/user/offer/user/:id", offersCrtl.particularOffer);
router.get("/driver/offer/details/:id" , offersCrtl.singleOffer)
router.post('/driver/email', offersCrtl.emailSend)

module.exports = router;
