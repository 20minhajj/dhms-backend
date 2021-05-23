const errorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    //   handling JWT error
    return res.status(404).json({ message: "The user in not authorised" });
  }
  if (err.name === "ValidationError") {
    //   File upload error
    return res.status(404).json({ message: err });
  }

  return es.status(500).json({ message: "Internal Server Error" });
};

module.exports = errorHandler;
