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
  const id = req.params.id;
  Car.findAll({
    where: { userID: id },
  })
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

exports.allCars = (req, res) => {
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
  const id = req.params.id;
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
  Car.update(
    {
      carModel: req.body.carModel,
      regNo: req.body.regNo,
    },
    {
      where: { carID: req.params.id },
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

// try{
//         let customerId = req.params.id;
//         let customer = await Customer.findByPk(customerId);

//         if(!customer){
//             res.status(404).json({
//                 message: "Does Not exist a Customer with id = " + customerId,
//                 error: "404",
//             });
//         } else {
//             await customer.destroy();
//             res.status(200);
//         }
//     } catch(error) {
//         res.status(500).json({
//             message: "Error -> Can NOT delete a customer with id = " + req.params.id,
//             error: error.message
//         });
//     }
