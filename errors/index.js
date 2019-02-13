exports.handle400 = (err, req, res, next) => {
  const badRequestCodes = {
    23502: "Bad Request"
  };
  if (badRequestCodes[err.code])
    res.status(400).send({ msg: badRequestCodes[err.code] });
  else next(err);
};

exports.handle405 = (req, res) => {
  res.status(405).send({ msg: "Method not allowed" });
};
