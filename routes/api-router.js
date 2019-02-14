const apiRouter = require('express').Router();
const { getTopics, postTopic } = require('../controllers/topics');
const {
  getArticles,
  postArticle,
  getArticlebyId,
  patchArticleByIdUpdateVote,
  deleteArticle,
} = require('../controllers/articles');
const {
  getCommentsbyId,
  postCommentById,
  patchCommentByIdUpdateVote,
  deleteComment,
} = require('../controllers/comments');
const { getUsers, postUser, getUserbyId } = require('../controllers/users');
const { sendRoutes } = require('../end-points');
const { handle405 } = require('../errors/index');

apiRouter
  .route('/topics')
  .get(getTopics)
  .post(postTopic);

apiRouter
  .route('/articles')
  .get(getArticles)
  .post(postArticle)
  .all(handle405);

apiRouter
  .route('/articles/:article_id')
  .get(getArticlebyId)
  .patch(patchArticleByIdUpdateVote)
  .delete(deleteArticle);

apiRouter
  .route('/articles/:article_id/comments')
  .get(getCommentsbyId)
  .post(postCommentById);

apiRouter
  .route('/comments/:comment_id')
  .patch(patchCommentByIdUpdateVote)
  .delete(deleteComment);

apiRouter
  .route('/users')
  .get(getUsers)
  .post(postUser);

apiRouter.route('/users/:user_id').get(getUserbyId);

apiRouter.route('/').get(sendRoutes);

module.exports = apiRouter;
