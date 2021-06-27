const Driver = require("./driver.model");
const User = require("./user.model");

module.exports = (sequelize, Sequelize) => {
  const Offers = sequelize.define(
    "Offers",
    {
      offersID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      locFrom: {
        type: Sequelize.STRING,
        required: true,
      },
      locTo: {
        type: Sequelize.STRING,
        required: true,
      },
      date: {
        type: Sequelize.STRING,
        required: true,
      },
      time: {
        type: Sequelize.STRING,
        required: true,
      },
      price: {
        type: Sequelize.STRING,
        required: true,
      },
      status: {
        type: Sequelize.BOOLEAN,
        required: true,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );

  return Offers;
};
