const apiRouter = require("express").Router();
const { getTopics, postTopic } = require("../controllers/topics");
const {
  getArticles,
  postArticle,
  getArticlebyId,
  patchArticleByIdUpdateVote,
  deleteArticle
} = require("../controllers/articles");

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

module.exports = apiRouter;
