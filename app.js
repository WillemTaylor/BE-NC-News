const app = require('express')();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api-router');
const {
  handle400, handle404, handle405, handle422,
} = require('./errors/index');
// const { data } = require('./end-points.json');

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.all('/*', (req, res) => {
  res.status(404).send({ msg: 'Page not found' });
});

app.use(handle400);
app.use(handle404);
app.use(handle405);
app.use(handle422);

// let route;
// const routes = [];

// app._router.stack.forEach((middleware) => {
//   if (middleware.route) {
//     routes.push(middleware.route);
//     // console.log(routes);
//   } else if (middleware.name === 'router') {
//     middleware.handle.stack.forEach((handler) => {
//       route = handler.route;
//       route && routes.push(route);
//       // console.log(route);
//       // console.log(routes);
//     });
//   }
// });

module.exports = app;
