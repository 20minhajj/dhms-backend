// const db = require("../config/connection.config");
const config = require("../config/roles.config");
const ROLEs = config.ROLEs;

checkRolesExisted = async (req, res, next) => {
  for (let i = 0; i < req.body.roles.length; i++) {
    if (!ROLEs.includes(req.body.roles[i].toUpperCase())) {
      res
        .status(400)
        .send("Fail -> Does NOT exist Role = " + req.body.roles[i]);
      return;
    }
  }
  next();
};

const verifyRoles = {};
verifyRoles.checkRolesExisted = checkRolesExisted;
module.exports = verifyRoles;
