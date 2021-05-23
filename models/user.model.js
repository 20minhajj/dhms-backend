module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "Users",
    {
      userID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      fname: {
        type: Sequelize.STRING,
        required: true,
      },
      lname: {
        type: Sequelize.STRING,
        required: true,
      },
      gender: {
        type: Sequelize.STRING,
        required: true,
      },
      email: {
        type: Sequelize.STRING,
        required: true,
        IsEmail: true,
      },
      phoneNo: {
        type: Sequelize.STRING,
        required: true,
      },
      address: {
        type: Sequelize.STRING,
        required: true,
      },
      profilePic: {
        type: Sequelize.STRING,
      },
      carModel: {
        type: Sequelize.STRING,
        required: true,
      },
      regNo: {
        type: Sequelize.STRING,
        required: true,
      },
      password: {
        type: Sequelize.STRING,
        required: true,
      },
    },
    { timestamps: false }
  );

  return User;
};
