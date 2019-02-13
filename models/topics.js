const connection = require('../db/connection');

exports.fetchTopics = () => connection.select('*').from('topics');

exports.insertTopic = topic => connection('topics')
  .insert(topic)
  .returning('*');
