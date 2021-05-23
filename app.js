const express = require("express");
const db = require("./config/connection.config");
const app = express();
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/errorHandler");

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.options("*", cors);
app.use(authJwt());
app.use(errorHandler);

const DriverRoutes = require("./router/driver.router");
// ROUTES
app.use("/api", DriverRoutes);

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync");
});

const server = app.listen(process.env.PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});
