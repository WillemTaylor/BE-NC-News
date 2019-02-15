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
const { handle404, handle405 } = require('../errors/index');

apiRouter
  .route('/topics')
  .get(getTopics)
  .post(postTopic)
  .all(handle405);

apiRouter
  .route('/articles')
  .get(getArticles)
  .post(postArticle)
  .all(handle405);

apiRouter
  .route('/articles/:article_id')
  .get(getArticlebyId)
  .patch(patchArticleByIdUpdateVote)
  .delete(deleteArticle)
  .all(handle405);

apiRouter
  .route('/articles/:article_id/comments')
  .get(getCommentsbyId)
  .post(postCommentById)
  .all(handle405);

apiRouter
  .route('/comments/:comment_id')
  .patch(patchCommentByIdUpdateVote)
  .delete(deleteComment)
  .all(handle405);

apiRouter
  .route('/users')
  .get(getUsers)
  .post(postUser)
  .all(handle405);

apiRouter.route('/users/:user_id').get(getUserbyId).all(handle405);

apiRouter.route('/').get(sendRoutes).all(handle404);

module.exports = apiRouter;
