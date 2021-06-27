const Driver = require("./driver.model");
const User = require("./user.model");

module.exports = (sequelize, Sequelize) => {
  const Reservation = sequelize.define(
    "Reservation",
    {
      reservID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      }
    },
    { timestamps: false }
  );

  return Reservation;
};
