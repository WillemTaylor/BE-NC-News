const {
  fetchCommentsbyId,
  insertCommentByArticleId,
  fetchCommentByIdUpdateVote,
  removeCommentById,
} = require('../models/comments');
const { commentData } = require('../db/data');

exports.getCommentsbyId = (req, res, next) => {
  const articleById = req.params.article_id;
  const { sort_by, order } = req.query;
  return fetchCommentsbyId(sort_by, order, articleById)
    .then((comments) => {
      if (comments) return res.status(200).send({ comments });
      return Promise.reject({ status: 404, msg: 'Comments not found' });
    })
    .catch(next);
};

exports.postCommentById = (req, res, next) => {
  const articleById = req.params.article_id;
  const newComment = req.body;
  return insertCommentByArticleId(articleById, newComment)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.patchCommentByIdUpdateVote = (req, res, next) => {
  const commentById = req.params.comment_id;
  const updatedVote = req.body.inc_votes;
  if (typeof updatedVote === 'string') {
    return res.status(400).send({ msg: "Comment couldn't be updated" });
  }
  if (updatedVote === undefined) {
    return fetchCommentByIdUpdateVote(commentById)
      .then(comment => res.status(200).send({ comment }))
      .catch(next);
  }
  return fetchCommentByIdUpdateVote(commentById, updatedVote)
    .then(([comment]) => {
      if (updatedVote) return res.status(200).send({ comment });
      return Promise.reject({ status: 404, msg: "Comment couldn't be updated" });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const commentById = req.params.comment_id;
  if (commentById > commentData.length) next({ status: 404, msg: 'Comment not found' });
  removeCommentById(commentById)
    .then((msg) => {
      if (msg) {
        return res.status(204).send({ msg });
      }
      return Promise.reject({ status: 404, msg: 'Comment not found' });
    })
    .catch(next);
};
