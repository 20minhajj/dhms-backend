const db = require("../config/connection.config");

const Car = db.car;

exports.addCar = (req, res) => {
  Car.create({
    carModel: req.body.carModel,
    regNo: req.body.regNo,
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
      }git 
      res.status(201).send(car);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.deleteCar = (req, res) => {
  const id = req.params.carID;
  Car.destroy({
    where: { id: id },
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
      where: { id: id },
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
