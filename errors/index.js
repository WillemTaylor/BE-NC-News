exports.handle400 = (err, req, res, next) => {
  const badRequestCodes = {
    23502: 'violates not null violation',
    '22P02': 'Bad request: invalid input',
  };
  if (badRequestCodes[err.code] || err.status === 400) {
    res.status(400).send({ msg: badRequestCodes[err.code] || err.msg });
  } else next(err);
};

exports.handle404 = (err, req, res, next) => {
  const badRequestCodes = {
    42703: 'Not found',
  };
  if (badRequestCodes[err.code] || err.status === 404) {
    res.status(404).send({ msg: badRequestCodes[err.code] || err.msg });
  } else next(err);
};

exports.handle405 = (req, res, next) => {
  res.status(405).send({ msg: 'Method not allowed' });
};

exports.handle422 = (err, req, res, next) => {
  const badRequestCodes = {
    23505: 'Topic already exists',
  };
  if (badRequestCodes[err.code] || err.status) {
    res.status(422).send({ msg: "Request couldn't be processed" });
  } else next(err);
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal server error' });
};
