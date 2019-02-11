const { topicData, userData } = require("../data/");

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
    );
};
