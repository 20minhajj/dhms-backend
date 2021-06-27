const db = require("../config/connection.config");
const jwt = require("jsonwebtoken");

const Offer = db.offers;

exports.addOffer = (req, res) => {
  const cookie = req.cookies["jwt"];
  const claims = jwt.verify(cookie, process.env.SECRETE);
  Offer.create({
    locFrom: req.body.locFrom,
    locTo: req.body.locTo,
    date: req.body.date,
    time: req.body.time,
    price: req.body.price,
    carID: req.body.carID,
    userID: claims.userID,
  })
    .then((offer) => {
      res.status(200).send(offer);
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
};

exports.listOffers = (req, res) => {
  Offer.findAll()
    .then((offer) => {
      if (!offer) {
        res.status(401).json({ message: "No Offer to display" });
      }
      res.status(201).send(offer);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.deleteOffer = (req, res) => {
  const id = req.params.offerID;
  Offer.destroy({
    where: { id: id },
  })
    .then((offer) => {
      if (!offer) {
        res.status(401).json({ message: "No offer to be deleted" });
      }
      res.status(201).send(offer);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.editOffer = (req, res) => {
  const id = req.params.offerID;
  Offer.update(
    {
      locFrom: req.body.locFrom,
      locTo: req.body.locTo,
      date: req.body.date,
      time: req.body.time,
      price: req.body.price,
      carID: req.body.carID,
    },
    {
      where: { id: id },
    }
  )
    .then((offer) => {
      if (!offer) {
        res.status(401).json({ message: "No offer to be Edited" });
      }
      res.status(201).send(offer);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};
