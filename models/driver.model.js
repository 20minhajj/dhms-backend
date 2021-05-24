module.exports = (sequelize, Sequelize) => {
  const Driver = sequelize.define(
    "driver",
    {
      driverID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      fname: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      lname: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        required: true,
        IsEmail: true,
        allowNull: false,
      },
      phoneNo: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      profilePic: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      licenseNo: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
      experience: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return Driver;
};
