const env = require("./variables.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables


db.driver = require("../models/driver.model")(sequelize, Sequelize);
db.user = require("../models/user.model")(sequelize, Sequelize);
db.payment = require("../models/payment.model")(sequelize, Sequelize);
db.reservation = require("../models/reservation.model")(sequelize, Sequelize);
db.role = require("../models/role.model")(sequelize, Sequelize);
module.exports = db;
