const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./routes/api-router');
const {
  handle400, handle404, handle422, handle500,
} = require('./errors/index');

app.use(cors());

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.all('/*', (err, req, res, next) => {
  res.status(404).send({ msg: 'Page not found' });
});

app.use(handle400);
app.use(handle404);
app.use(handle422);
app.use(handle500);


module.exports = app;
