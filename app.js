const express = require("express");
// const session = require("cookie-session");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const helmet = require("helmet");
const hpp = require("hpp");
const csurf = require("csurf");
const limiter = require("express-rate-limit");
const db = require("./config/connection.config");
const app = express();
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/errorHandler");
require("./helpers/passport")(app);
const Role = db.role;

/* Set Security Configs */
app.use(helmet());
app.use(hpp());
//
// MIDDLEWARES

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);
app.options("*", cors);
app.use(authJwt());
app.use(errorHandler);

app.use(csurf());

app.use(limiter);

const DriverRoutes = require("./router/driver.router");
const UserRoutes = require("./router/user.router");
const CarRoutes = require("./router/car.router");
const OfferRoutes = require("./router/offers.router");
const ReservationRoutes = require("./router/reservation.router");
// ROUTES
app.use("/api", DriverRoutes);
app.use("/api", UserRoutes);
app.use("/api", CarRoutes);
app.use("/api", OfferRoutes);
app.use("/api", ReservationRoutes);

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
