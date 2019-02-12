const connection = require("../db/connection");

exports.fetchTopics = () => {
  return connection.select("*").from("topics");
};

exports.insertTopic = topic => {
  return connection("topics")
    .insert(topic)
    .returning("*");
};
