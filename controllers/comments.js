const {
  fetchCommentsbyId,
  insertCommentByArticleId,
  fetchCommentByIdUpdateVote,
  removeCommentById,
} = require('../models/comments');

exports.getCommentsbyId = (req, res, next) => {
  const articleById = req.params.article_id;
  const { sort_by, order } = req.query;
  fetchCommentsbyId(sort_by, order, articleById)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentById = (req, res, next) => {
  const articleById = req.params.article_id;
  const newComment = req.body;
  insertCommentByArticleId(articleById, newComment)
    .then(([comments]) => {
      res.status(201).send({ comments });
    })
    .catch(next);
};

exports.patchCommentByIdUpdateVote = (req, res, next) => {
  const commentById = req.params.comment_id;
  const updatedVote = req.body.inc_votes;
  fetchCommentByIdUpdateVote(commentById, updatedVote)
    .then((comment) => {
      res.status(202).send({ comment });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const commentById = req.params.comment_id;
  removeCommentById(commentById)
    .then((msg) => {
      res.status(204).send({ msg });
    })
    .catch(next);
};
