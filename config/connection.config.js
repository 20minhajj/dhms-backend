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
db.offers = require('../models/offer.model')(sequelize, Sequelize);

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
db.offers.hasOne(db.reservation, { foreignKey: "offersID", sourceKey: "offersID" });
db.reservation.belongsTo(db.offers, {
  foreignKey: "offersID",
  targetKey: "offersID",
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

// User to car
db.user.hasMany(db.car, {
  foreignKey: "userID",
  sourceKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true
});
db.car.belongsTo(db.user, {
  foreignKey: "userID",
  targetKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// user to offer
db.user.hasMany(db.offers, {
  foreignKey: "userID",
  sourceKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true
});
db.offers.belongsTo(db.user, {
  foreignKey: "userID",
  targetKey: "userID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// car to offer
db.car.hasMany(db.offers, {
  foreignKey: "carID",
  sourceKey: "carID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  hooks: true
});
db.offers.belongsTo(db.car, {
  foreignKey: "carID",
  targetKey: "carID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = db;
