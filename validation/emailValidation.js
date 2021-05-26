const db = require("../config/connection.config");
const Driver = db.driver;
const User = db.user;

checkDuplicateDriverEmail = (req, res, next) => {
  Driver.findOne({
    where: {
      email: req.body.email,
    },
  }).then((driver) => {
    if (driver) {
      res.status(400).json({ message: "Image already taken" });
    }
    next();
  });
};

checkDuplicateUserEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).json({ message: "Image already taken" });
    }
    next();
  });
};

const verfy = {};
verfy.checkDuplicateDriverEmail = checkDuplicateDriverEmail;
verfy.checkDuplicateUserEmail = this.checkDuplicateUserEmail;

module.exports = verfy;
