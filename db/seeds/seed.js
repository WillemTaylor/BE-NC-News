const { topicData, userData, articleData, commentData } = require("../data/");
const {
  dateRef,
  dateRef1,
  createRef,
  formatComments
} = require("../utils/index");

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
    })
    .then(articlesTable => {
      const articlesRef = createRef(articlesTable, "title", "article_id");
      const formattedComments = formatComments(commentData, articlesRef);
      const formattedTime = dateRef1(formattedComments);
      return knex("comments")
        .insert(formattedTime)
        .returning("*");
    });
};
