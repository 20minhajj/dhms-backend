const Reservation = require("./reservation.model");
module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define(
    "Payment",
    {
      paymentID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      amount: {
        type: Sequelize.STRING,
        required: true,
      },
      date: {
        type: Sequelize.STRING,
        required: true,
      },
    },
    { timestamps: false }
  );

  return Payment;
};
