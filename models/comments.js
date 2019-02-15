const connection = require('../db/connection');

exports.fetchCommentsbyId = (sort_by, order, id) => connection
  .select('*')
  .from('comments')
  .where('article_id', id)
  .orderBy(sort_by || 'created_at', order || 'desc');

exports.insertCommentByArticleId = (id, comment) => {
  const { username, body } = comment;
  return connection('comments')
    .insert({
      article_id: id,
      author: username,
      body,
    })
    .returning('*');
};

exports.fetchCommentByIdUpdateVote = (id, newVote) => connection
  .select('*')
  .from('comments')
  .where('comment_id', id)
  .increment('votes', newVote || 0)
  .returning('*');

exports.removeCommentById = id => connection
  .select('*')
  .from('comments')
  .where('comment_id', id)
  .del('*');
