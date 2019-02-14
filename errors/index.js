exports.handle400 = (err, req, res, next) => {
  const badRequestCodes = {
    23502: 'violates not null violation',
    '22P02': 'Bad request: invalid input',
  };
  if (badRequestCodes[err.code]) res.status(400).send({ msg: badRequestCodes[err.code] });
  else next(err);
};

exports.handle404 = (err, req, res, next) => {
  res.status(404).send({ msg: err.msg || 'Not found' });
};

exports.handle405 = (req, res) => {
  res.status(405).send({ msg: 'Method not allowed' });
};

exports.handle422 = (err, req, res, next) => {
  res.status(422).send({ msg: "Request couldn't be processed" });
};
