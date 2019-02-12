const apiRouter = require("express").Router();
const { getTopics, postTopic } = require("../controllers/topics");
const {
  getArticles,
  postArticle,
  getArticlebyId,
  patchArticleByIdUpdateVote,
  deleteArticle
} = require("../controllers/articles");
const { getUsers, postUser, getUserbyId } = require("../controllers/users");

apiRouter
  .route("/topics")
  .get(getTopics)
  .post(postTopic);

apiRouter
  .route("/articles")
  .get(getArticles)
  .post(postArticle);

apiRouter
  .route("/articles/:article_id")
  .get(getArticlebyId)
  .patch(patchArticleByIdUpdateVote)
  .delete(deleteArticle);

apiRouter
  .route("/users")
  .get(getUsers)
  .post(postUser);

apiRouter.route("/users/:user_id").get(getUserbyId);

module.exports = apiRouter;
