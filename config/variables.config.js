const dotenv = require("dotenv");

dotenv.config();

const env = {
  database: process.env.DB,
  username: process.env.USER,
  password: "",
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = env;
