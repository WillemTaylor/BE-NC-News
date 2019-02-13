const {
  fetchArticles,
  insertArticle,
  fetchArticleById,
  fetchArticleByIdUpdateVote,
  removeArticleById
} = require("../models/articles");

exports.getArticles = (req, res, next) => {
  const { sortBy, order, ...whereClauses } = req.query;
  const conditions = {};
  //if (sortBy, order, ...whereClauses) conditions.sortBy = sortBy
  fetchArticles(sortBy, order, whereClauses) //conditions
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.postArticle = (req, res, next) => {
  const newArticle = req.body;
  insertArticle(newArticle)
    .then(([articles]) => {
      res.status(201).send({ articles });
    })
    .catch(next);
};

exports.getArticlebyId = (req, res, next) => {
  const articleById = req.params.article_id;
  fetchArticleById(articleById)
    .then(articles => {
      console.log(articles);
      if (![]) return res.status(200).send({ articles });
      else return Promise.reject({ status: 404, msg: "Article not found" });
    })
    .catch(next);
};

exports.patchArticleByIdUpdateVote = (req, res, next) => {
  const articleById = req.params.article_id;
  const updatedVote = req.body.inc_votes;
  fetchArticleByIdUpdateVote(articleById, updatedVote)
    .then(article => {
      res.status(202).send({ article });
    })
    .catch(next);
};

exports.deleteArticle = (req, res) => {
  const articleById = req.params.article_id;
  removeArticleById(articleById)
    .then(msg => {
      res.status(204).send({ msg });
    })
    .catch(next);
};
