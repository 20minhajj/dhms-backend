const db = require("../config/connection.config");
const jwt = require("jsonwebtoken");
const Reservation = db.reservation;

exports.makeResevation = (req, res) => {
  const cookie = req.cookies["jwt"];
  const claims = jwt.verify(cookie, process.env.SECRETE);
  Reservation.create({
    offersID: req.body.offersID,
    driverID: claims.driverID,
  })
    .then((reserv) => {
      return res.status(200).send("Reservation is Succecfully");
    })
    .catch((err) => {
      return res.status(400).json({ Erro: err });
    });
};
