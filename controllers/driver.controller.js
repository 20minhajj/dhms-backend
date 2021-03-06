const db = require("../config/connection.config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { role } = require("../config/connection.config");
const Driver = db.driver;
const Role = db.roles;

const Op = db.Sequelize.Op;
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image format");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadProfile = multer({ storage: storage });

const capitalLetter = (a) => {
  return a[0].toUpperCase();
};

exports.registration = (req, res) => {
  Driver.create({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    gender: req.body.gender,
    address: req.body.address,
    licenseNo: req.body.licenseNo,
    experience: req.body.experience,
    status: req.body.status,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      })
        .then((roles) => {
          user.setRoles(roles).then(() => {
            res.send("User registered successfully!");
          });
        })
        .catch((err) => {
          res.status(500).send("Error -> " + err);
        });
    })
    .catch((err) => {
      res.status(500).send("Fail! Error -> " + err);
    });
};

exports.signin = (req, res) => {
  Driver.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((driver) => {
      if (!driver) {
        return res.status(404).json({ message: "User not found" });
      }
      const validPassword = bcrypt.compareSync(
        req.body.password,
        driver.password
      );

      if (!validPassword) {
        return res
          .status(401)
          .send({ auth: false, reason: "invalid password" });
      }
      const token = jwt.sign(
        {
          driverID: driver.driverID,
          //   isadmin : driver.isadmin
        },
        process.env.SECRETE,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).send({ auth: true, authToken: token });
    })
    .catch((err) => {
      res.status(500).send("Error" + err);
    });
};

exports.allDrivers = (req, res) => {
  Driver.findAll()
    .then((driver) => {
      if (!driver) {
        res.status(401).json({ message: "No driver found" });
      }
      res.status(201).send(driver);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.oneDriver = (req, res) => {
  Driver.findOne(req.params.driverID)
    .then((driver) => {
      if (!driver) {
        res.status(401).json({ message: "No driver found" });
      }
      res.status(201).send(driver);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.deleteDriver = (req, res) => {
  const id = req.params.driverID;
  Driver.destroy({
    where: { id: id },
  })
    .then((driver) => {
      if (!driver) {
        res.status(401).json({ message: "No driver found" });
      }
      res.status(201).send(driver);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.editDriver = (req, res) => {
  const id = req.params.driverID;
  Driver.update(
    {
      phoneNo: req.body.phoneNo,
      address: req.body.address,
      experience: req.body.experience,
    },
    { where: { id: id } }
  )
    .then((driver) => {
      if (!driver) {
        res.status(401).json({ message: "No driver found" });
      }
      res.status(201).send(driver);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.setProfilePic = (req, res) => {
  const file = req.file;
  if (file) {
    return res.status(400).json({ message: "Image is required" });
  }
  const fileName = req.file.filename;
  const basePath = `${req.protocal}://${req.get("host")}/public/uploads/`;
  Driver.update(
    {
      profilePic: `${basePath}${fileName}`,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
};

exports.profile = (req, res) => {
  const cookie = req.cookies["jwt"];
  const claims = jwt.verify(cookie, process.env.SECRETE);
  if (!claims) {
    return res.status(400).send({ message: "unAuthenticated" });
  }
  // res.send(claims)
  Driver.findOne({
    where: { driverID: claims.driverID },
  })
    .then((profile) => {
      res.status(200).send(profile);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
