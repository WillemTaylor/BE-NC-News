const connection = require("../db/connection");

exports.fetchTopics = () => {
  return connection.select("*").from("topics");
};

exports.insertTopic = req => {
  return connection("topics")
    .insert(req.body)
    .returning("*");
};
