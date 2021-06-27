const db = require("../config/connection.config");
const jwt = require("jsonwebtoken");

const Car = db.car;

exports.addCar = (req, res) => {
  const cookie = req.cookies["jwt"];
  const claims = jwt.verify(cookie, process.env.SECRETE);
  Car.create({
    carModel: req.body.carModel,
    regNo: req.body.regNo,
    userID: claims.userID,
  })
    .then((car) => {
      res.status(200).send(car);
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
};

exports.listCars = (req, res) => {
  Car.findAll()
    .then((car) => {
      if (!car) {
        res.status(401).json({ message: "No cars to display" });
      }
      res.status(201).send(car);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.deleteCar = (req, res) => {
  const id = req.params.carID;
  Car.destroy({
    where: { carID: id },
  })
    .then((car) => {
      if (!car) {
        res.status(401).json({ message: "No car to be deleted" });
      }
      res.status(201).send(car);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.editCar = (req, res) => {
  const id = req.params.carID;
  Car.update(
    {
      carModel: req.body.carModel,
      regNo: req.body.regNo,
    },
    {
      where: { carID: id },
    }
  )
    .then((car) => {
      if (!car) {
        res.status(401).json({ message: "No car to be deleted" });
      }
      res.status(201).send(car);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};
