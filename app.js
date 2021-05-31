const express = require("express");
const db = require("./config/connection.config");
const app = express();
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/errorHandler");
const Role = db.role;

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.options("*", cors);
app.use(authJwt());
app.use(errorHandler);

const DriverRoutes = require("./router/driver.router");
const UserRoutes = require("./router/user.router");
const CarRoutes = require("./router/car.router");
// ROUTES
app.use("/api", DriverRoutes);
app.use("/api", UserRoutes);
app.use("/api", CarRoutes);

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync");
  initial();
});

const server = app.listen(process.env.PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("App listening at http://%s:%s", host, port);
});

function initial() {
  Role.create({
    roleID: 1,
    name: "ADMIN",
  });

  Role.create({
    roleID: 2,
    name: "USER",
  });

  Role.create({
    roleID: 3,
    name: "DRIVER",
  });

  Role.create({
    roleID: 4,
    name: "COOPRATES",
  });
}
