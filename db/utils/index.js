exports.dateRef = articles => {
  return articles.map(article => {
    article.created_at = new Date(article.created_at).toISOString();
    return article;
  });
};

exports.dateRef1 = comments => {
  return comments.map(comment => {
    comment.created_at = new Date(comment.created_at).toISOString();
    return comment;
  });
};

exports.createRef = (data, title, id) => {
  return data.reduce((ref, datum) => {
    ref[datum[title]] = datum[id];
    return ref;
  }, {});
};

exports.formatComments = (comments, ref) =>
  comments.map(comment => {
    return {
      body: comment.body,
      article_id: ref[comment.belongs_to],
      author: comment.created_by,
      votes: comment.votes,
      created_at: comment.created_at
    };
  });
