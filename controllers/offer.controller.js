const db = require("../config/connection.config");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const Offer = db.offers;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "danbanda968@gmail.com",
    pass: "Bignoi@5",
  },
});

exports.addOffer = (req, res) => {
  const cookie = req.cookies["jwt"];
  const claims = jwt.verify(cookie, process.env.SECRETE);
  Offer.create({
    locFrom: req.body.locFrom,
    locTo: req.body.locTo,
    date: req.body.date,
    time: req.body.time,
    price: req.body.price,
    carID: req.body.carID,
    userID: claims.userID,
  })
    .then((offer) => {
      res.status(200).send(offer);
    })
    .catch((err) => {
      res.status(400).json({ Error: err });
    });
};

exports.listOffers = (req, res) => {
  Offer.findAll()
    .then((offer) => {
      if (!offer) {
        res.status(401).json({ message: "No Offer to display" });
      }
      res.status(201).send(offer);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};
exports.openOffers = (req, res) => {
  Offer.findAll({
    where: { status: "1" },
  })
    .then((offer) => {
      if (!offer) {
        res.status(401).json({ message: "No Offer to display" });
      }
      res.status(201).send(offer);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.closedOffers = (req, res) => {
  Offer.findAll({
    where: { status: "2" },
  })
    .then((offer) => {
      if (!offer) {
        res.status(401).json({ message: "No Offer to display" });
      }
      res.status(201).send(offer);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.particularOffer = (req, res) => {
  Offer.findAll({
    where: { userID: req.params.id },
  })
    .then((offer) => {
      if (!offer) {
        res.status(401).json({ message: "No Offer to display" });
      }
      res.status(201).send(offer);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.singleOffer = (req, res) => {
  Offer.findOne({
    where: { offersID: req.params.id },
  })
    .then((offer) => {
      if (!offer) {
        res.status(401).json({ message: "No Offer to display" });
      }
      res.status(201).send(offer);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};
exports.deleteOffer = (req, res) => {
  const id = req.params.offerID;
  Offer.destroy({
    where: { offersID: id },
  })
    .then((offer) => {
      if (!offer) {
        res.status(401).json({ message: "No offer to be deleted" });
      }
      res.status(201).send(offer);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.editOffer = (req, res) => {
  const id = req.params.offerID;
  Offer.update(
    {
      locFrom: req.body.locFrom,
      locTo: req.body.locTo,
      date: req.body.date,
      time: req.body.time,
      price: req.body.price,
      carID: req.body.carID,
    },
    {
      where: { offersID: id },
    }
  )
    .then((offer) => {
      if (!offer) {
        res.status(401).json({ message: "No offer to be Edited" });
      }
      res.status(201).send(offer);
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};

exports.emailSend = (req, res) => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.send("Email sent: " + info.response);
    }
  });
};
exports.acceptOffer = (req, res) => {
  const id = req.params.id;
  const { user, driver,email, phoneNo, locFrom, locTo, date, time } = req.body;
  Offer.update(
    {
      status: req.body.status,
    },
    {
      where: { offersID: id },
    }
  )
    .then((offer) => {
      if (!offer) {
        return res.status(401).json({ message: "No offer to be made" });
      }
      res.status(200).send(offer);
    })
    .then((mail) => {
      const mailOptions = {
        from: "danbanda968@gmail.com",
        to: email ,
        subject: "@noreplay - DHMS-Ride Accepted",
        html: `<h5>Dear ${user}</h5>
        <p>Your Ride from ${locFrom} to ${locTo} on ${date} at ${time}, has been accepted by Driver <b> ${driver}</b>
        please reach out to the driver via email: ${email} or Phone Number ${phoneNo}</p>
        <br>
        <p>Thank you for your Trust of Hiring DHMS Drivers</p>
        <br>
        <p>Have a nice journey</p>
        <p><b>DHMS TEAM</b></p>
         `,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.send("Email sent: " + info.response);
        }
      });
    })
    .catch((err) => {
      res.status(500).json({ Error: err });
    });
};
