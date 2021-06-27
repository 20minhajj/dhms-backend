const passwordValidation = require("password-validator");

passValidation = (req, res, next) => {
  req.body.password;
  var schema = new passwordValidation();;
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(50) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces(); // Should not have spaces
  if (schema.validate(req.body.password)) {
    next();
  } else {
    return res.status(500).send("Password is too weak");
  }
};

const passValid = {};
passValid.passValidation = passValidation;
module.exports = passValid;
