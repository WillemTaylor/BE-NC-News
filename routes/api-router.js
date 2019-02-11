const apiRouter = require("express").Router();
const { getTopics, postTopic } = require("../controllers/topics");
const { getArticles } = require("../controllers/articles");

apiRouter
  .route("/topics")
  .get(getTopics)
  .post(postTopic);

apiRouter.route("/articles").get(getArticles);

module.exports = apiRouter;
