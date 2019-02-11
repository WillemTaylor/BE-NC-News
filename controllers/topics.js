const { fetchTopics, insertTopic } = require("../models/topics");

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(console.log);
};

exports.postTopic = (req, res, next) => {
  insertTopic()
    .then(topics => {
      res.status(201).send({ topics });
    })
    .catch(console.log);
};
