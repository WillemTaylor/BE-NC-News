exports.up = function(knex, Promise) {
  console.log("Creating articles table...");
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id");
    articlesTable.string("title").notNullable();
    articlesTable.string("body").notNullable();
    articlesTable.integer("votes").defaultTo(0);
    articlesTable
      .string("topic")
      .notNullable()
      .references(topics.slug);
    articlesTable.string("author").notNullable();
    articlesTable.timestamp("created_at", { useTz: true });
  });
};

exports.down = function(knex, Promise) {
  console.log("Removing articles table...");
  return knex.schema.dropTable("articles");
};
