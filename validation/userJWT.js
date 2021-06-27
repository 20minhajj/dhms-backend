const jwt = require("jsonwebtoken");

verifyUserJWT =  (req, res, next) => {
  const cookie = req.cookies["jwt"];
 
  
  const claims = jwt.verify(cookie, process.env.SECRETE);
  if (!claims) {
    return res.status(400).send({ message: "unAuthenticated" });
  }
  next()
};

verifyDriverJWT = (req, res, next) => {
  const cookie = req.cookies["jwt"];
  jwt
    .verify(cookie, process.env.SECRETE)
    .then((userclaims) => {
      if (!userclaims) {
        return res.status(400).send({ message: "unAuthenticated" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
      next();
    });
};

const jwtVerify = {};
jwtVerify.verifyUserJWT = verifyUserJWT;
jwtVerify.verifyDriverJWT = verifyDriverJWT;

module.exports = jwtVerify;
