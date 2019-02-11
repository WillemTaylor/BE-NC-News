const apiRouter = require("express").Router();
const { getTopics } = require("../controllers/topics");

apiRouter.route("/topics").get(getTopics);

module.exports = apiRouter;
