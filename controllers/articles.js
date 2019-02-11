const { fetchArticles, insertArticle } = require("../models/articles");

exports.getArticles = (req, res, next) => {
  const { limit, sortBy, ...whereClauses } = req.query;
  fetchArticles(limit, sortBy, whereClauses)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(console.log);
};

exports.postArticle = (req, res, next) => {
  insertArticle()
    .then(articles => {
      res.status(201).send({ articles });
    })
    .catch(console.log);
};
