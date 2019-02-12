const {
  fetchArticles,
  insertArticle,
  fetchArticleById
} = require("../models/articles");

exports.getArticles = (req, res, next) => {
  const { sortBy, order, ...whereClauses } = req.query;
  fetchArticles(sortBy, order, whereClauses)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(console.log);
};

exports.postArticle = (req, res, next) => {
  const newArticle = req.body;
  insertArticle(newArticle)
    .then(articles => {
      res.status(201).send({ articles });
    })
    .catch(console.log);
};

exports.getArticlebyId = (req, res, next) => {
  const articleById = req.params.article_id;
  fetchArticleById(articleById)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(console.log);
};
