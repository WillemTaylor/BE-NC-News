exports.sendRoutes = (req, res) => {
  res.sendFile(`${__dirname}/end-points.json`);
};
