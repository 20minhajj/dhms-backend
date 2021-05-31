module.exports = (sequelize, Sequelize) => {
  const Car = sequelize.define(
    "car",
    {
      carID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      carModel: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      regNo: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return Car;
};
