const db = require("../config/connection.config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Driver = db.driver;

exports.registration = (req, res) => {
  Driver.create({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    gender: req.body.gender,
    address: req.body.address,
    licenseNo: req.body.licenseNo,
    experience: req.body.experience,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((driver) => {
      res.status(200).send(driver);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

exports.signin = (req, res) => {
  Driver.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((driver) => {
      if (!driver) {
        return res.status(404).json({ message: "User not found" });
      }
      const validPassword = bcrypt.compareSync(
        req.body.password,
        driver.password
      );
      if (!validPassword) {
        return res
          .status(401)
          .send({ auth: false, reason: "invalid password" });
      }
      const token = jwt.sign(
        {
          driverID: driver.driverID,
          //   isadmin : driver.isadmin
        },
        process.env.SECRETE,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).send({ auth: true, authToken: token });
    })
    .catch((err) => {
      res.status(500).send("Error" + err);
    });
};

exports.allDrivers = (req, res) => {
  Driver.findAll()
    .then((driver) => {
      if (!driver) {
        res.status(401).json({ message: "No driver found" });
      }
      res.status(201).send(driver);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.oneDriver = (req, res) => {
  Driver.findOne(req.params.driverID)
    .then((driver) => {
      if (!driver) {
        res.status(401).json({ message: "No driver found" });
      }
      res.status(201).send(driver);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.deleteDriver = (req, res) => {
  const id = req.params.driverID;
  Driver.destrroy({
    where: { id: id },
  })
    .then((driver) => {
      if (!driver) {
        res.status(401).json({ message: "No driver found" });
      }
      res.status(201).send(driver);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.editDriver = (req, body) => {
  const id = req.params.driverID;
  Driver.update(
    {
      phoneNo: req.body.phoneNo,
      address: req.body.address,
      experience: req.body.experience,
    },
    { where: { id: id } }
  )
    .then((driver) => {
      if (!driver) {
        res.status(401).json({ message: "No driver found" });
      }
      res.status(201).send(driver);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};
