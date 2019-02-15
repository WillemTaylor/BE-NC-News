const connection = require('../db/connection');

exports.fetchArticles = (sort_by, order, { author, ...whereClauses }) => {
  if (author) whereClauses['articles.author'] = author;
  return connection
    .select('articles.*')
    .count('comments.comment_id as comment_count')
    .from('articles')
    .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
    .groupBy('articles.article_id')
    .where(whereClauses)
    .orderBy(sort_by || 'created_at', order || 'desc');
};

exports.insertArticle = article => connection('articles')
  .insert(article)
  .returning('*');

exports.fetchArticleById = id => connection
  .select('articles.*')
  .count('comments.comment_id as comment_count')
  .from('articles')
  .where('articles.article_id', id)
  .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
  .groupBy('articles.article_id');

exports.fetchArticleByIdUpdateVote = (id, newVote) => connection
  .select('*')
  .from('articles')
  .where('article_id', id)
  .increment('votes', newVote || 0)
  .returning('*');

exports.removeArticleById = id => connection
  .select('*')
  .from('articles')
  .where('article_id', id)
  .del('*');
