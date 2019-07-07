const serverError = (res, err) => {
  console.error(err);
  res.status(500).send("Server Error");
};

const validationError = (res, errors) => {
  return res.status(400).json({
    errors: errors.array()
  });
};

const badRequest = (res, msg) => {
  return res.status(400).json({
    errors: [
      {
        msg
      }
    ]
  });
};

const notFound = (res, msg) => {
  res.status(404).json({
    msg
  });
};

const notAuthorized = (res, msg) => {
  return res.status(401).json({
    msg
  });
};

module.exports = {
  serverError,
  validationError,
  badRequest,
  notFound,
  notAuthorized
};
