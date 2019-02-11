const { topicData, userData, articleData } = require("../data/");
const { dateRef } = require("../utils/index");

exports.seed = function(knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() =>
      knex("topics")
        .insert(topicData)
        .returning("*")
    )
    .then(() =>
      knex("users")
        .insert(userData)
        .returning("*")
    )
    .then(() => {
      const formattedTime = dateRef(articleData);
      return knex("articles")
        .insert(formattedTime)
        .returning("*");
    });
};
