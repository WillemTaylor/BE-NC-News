exports.handle400 = (err, req, res, next) => {
  const badRequestCodes = {
    23502: 'violates not null violation',
  };
  if (badRequestCodes[err.code]) res.status(400).send({ msg: badRequestCodes[err.code] });
  else next(err);
};

exports.handle405 = (req, res) => {
  res.status(405).send({ msg: 'Method not allowed' });
};
