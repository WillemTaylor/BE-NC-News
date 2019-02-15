exports.up = function (knex, Promise) {
  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id');
    commentsTable.string('author').references('users.username');
    commentsTable
      .integer('article_id')
      .references('articles.article_id')
      .unsigned()
      .onDelete('CASCADE');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.datetime('created_at').defaultTo(new Date().toISOString());
    commentsTable.text('body');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comments');
};
