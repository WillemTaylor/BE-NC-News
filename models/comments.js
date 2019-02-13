const connection = require('../db/connection');

exports.fetchCommentsbyId = id => connection
  .select('*')
  .from('comments')
  .where('article_id', id);

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
  .increment('votes', newVote)
  .returning('*');

exports.removeCommentById = id => connection
  .select('*')
  .from('comments')
  .where('comment_id', id)
  .del('*');
