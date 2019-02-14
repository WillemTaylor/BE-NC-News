const {
  fetchArticles,
  insertArticle,
  fetchArticleById,
  fetchArticleByIdUpdateVote,
  removeArticleById,
} = require('../models/articles');

exports.getArticles = (req, res, next) => {
  const { sort_by, order, ...whereClauses } = req.query;
  fetchArticles(sort_by, order, whereClauses)
    .then((articles) => {
      if (articles) return res.status(200).send({ articles });
      return Promise.reject({ status: 404, msg: 'Articles not found' });
    })
    .catch(next);
};

exports.postArticle = (req, res, next) => {
  const newArticle = req.body;
  insertArticle(newArticle)
    .then(([article]) => {
      res.status(201).send({ article });
    })
    .catch(next);
};

exports.getArticlebyId = (req, res, next) => {
  const articleById = req.params.article_id;
  fetchArticleById(articleById)
    .then(([article]) => {
      if (article) return res.status(200).send({ article });
      return Promise.reject({ status: 404, msg: 'Article not found' });
    })
    .catch(next);
};

exports.patchArticleByIdUpdateVote = (req, res, next) => {
  const articleById = req.params.article_id;
  const updatedVote = req.body.inc_votes;
  fetchArticleByIdUpdateVote(articleById, updatedVote)
    .then((article) => {
      if (updatedVote) return res.status(202).send({ article });
      return Promise.reject({ status: 404, msg: "Article couldn't be updated" });
    })
    .catch(next);
};

exports.deleteArticle = (req, res, next) => {
  const articleById = req.params.article_id;
  removeArticleById(articleById)
    .then((msg) => {
      res.status(204).send({ msg });
    })
    .catch(next);
};
