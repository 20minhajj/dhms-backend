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
db.car = require("../models/car.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleID",
  otherKey: "userID",
}); 
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userID",
  otherKey: "roleID",
});
// user to reservation
db.user.hasOne(db.reservation, { foreignKey: "userID", sourceKey: "userID" });
db.reservation.belongsTo(db.user, {
  foreignKey: "userID",
  targetKey: "userID",
});
// driver to reservation
db.driver.hasOne(db.reservation, {
  foreignKey: "driverID",
  sourceKey: "driverID",
});
db.reservation.belongsTo(db.driver, {
  foreignKey: "driverID",
  targetKey: "driverID",
});

// payment to reservation
db.reservation.hasOne(db.payment, {
  foreignKey: "reservationID",
  sourceKey: "reservID",
});
db.payment.belongsTo(db.reservation, {
  foreignKey: "reservationID",
  targetKey: "reservID",
});

// driver to car
db.driver.hasMany(db.car, { foreignKey: "driverID", sourceKey: "driverID" });
db.car.belongsTo(db.driver, { foreignKey: "driverID", targetKey: "driverID" });

module.exports = db;
