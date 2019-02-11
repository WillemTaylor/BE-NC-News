const connection = require("../db/connection");

exports.fetchArticles = (limit, sortBy, whereClauses) => {
  return connection
    .select("*")
    .from("articles")
    .where(whereClauses)
    .orderBy(sortBy);
};

exports.insertArticle = body => {
  return connection("articles")
    .insert(req.body)
    .returning("*");
};
