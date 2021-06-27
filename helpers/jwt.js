const expressjwt = require("express-jwt");

const authJwt = () => {
  const secret = process.env.SECRETE;
  return expressjwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: ["/api/driver/auth/signup", "/api/driver/auth/signin" , "/api/user/auth/signup", "/api/user/auth/signin"],
  });
};

module.exports = authJwt;
