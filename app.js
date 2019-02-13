const app = require('express')();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api-router');
const { handle400 } = require('./errors/index');

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.all('/*', (req, res) => {
  res.status(404).send({ msg: 'Page not found' });
});

app.use(handle400);

app.use((err, req, res, next) => {
  // similar pattern in here
  res.status(404).send({ msg: err.msg || 'Not found' });
});

let route;


const routes = [];

app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    routes.push(middleware.route);
    // console.log(routes);
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach((handler) => {
      route = handler.route;
      route && routes.push(route);
      // console.log(route);
      // console.log(routes);
    });
  }
});

module.exports = app;
