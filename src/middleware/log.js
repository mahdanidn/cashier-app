const logRequest = (req, res, next) => {
  console.log("requrest path", req.path);
  next();
};

module.exports = logRequest;
