const db = require("../config/connection.config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = db.user;

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

exports.registration = (req, res) => {
  User.create({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    gender: req.body.gender,
    address: req.body.address,
    carModel: req.body.carModel,
    reqNo: req.body.reqNo,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res
          .status(401)
          .send({ auth: false, reason: "invalid password" });
      }
      const token = jwt.sign(
        {
          userID: driver.driverID,
          //   isadmin : driver.isadmin
        },
        process.env.SECRETE,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).send({ auth: true, authToken: token });
    })
    .catch((err) => {
      res.status(500).send("Error" + err);
    });
};

exports.allUsers = (req, res) => {
  User.findAll()
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "No user found" });
      }
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.oneUser = (req, res) => {
  User.findOne(req.params.userID)
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "No user found" });
      }
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.deleteUser = (req, res) => {
  const id = req.params.userID;
  User.destroy({
    where: { id: id },
  })
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "No user found" });
      }
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.editUser = (req, body) => {
  const id = req.params.userID;
  User.update(
    {
      phoneNo: req.body.phoneNo,
      address: req.body.address,
      experience: req.body.experience,
    },
    { where: { id: id } }
  )
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: "No user found" });
      }
      res.status(201).send(user);
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
  User.update(
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
