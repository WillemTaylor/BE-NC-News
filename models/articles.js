const connection = require("../db/connection");

exports.fetchArticles = (sortBy, order, whereClauses) => {
  return connection
    .select("*")
    .from("articles")
    .groupBy("articles.article_id")
    .count("body as comment_count");
  //.where(whereClauses)
  //.orderBy(sortBy, order || "asc");
};

exports.insertArticle = article => {
  return connection("articles")
    .insert(article)
    .returning("*");
};

exports.fetchArticleById = id => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", id);
};

/*
SELECT house_name, COUNT (wizard_id) AS number_of_wizards
FROM houses
 JOIN wizards ON houses.house_id = wizard.house_id
GROUP BY house_name;

exports.getHouses = () => {
  return connection
  .select('houses.*')
  .from('houses')
  .join('wizards', 'wizard.house_id', '=', 'houses.house_id')
  .groupBy('houses.house_name')
  .count('wizards.id as student_count');
}
*/
