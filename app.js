const app = require('express')();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api-router');
const {
  handle400, handle404, handle422,
} = require('./errors/index');

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use(handle400);
app.use(handle404);
app.use(handle422);

app.all('/*', (err, req, res, next) => {
  res.status(404).send({ msg: 'Page not found' });
});


module.exports = app;
