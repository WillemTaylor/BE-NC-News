const connection = require('../db/connection');

exports.fetchUsers = () => connection.select('*').from('users');

exports.insertUser = users => connection('users')
  .insert(users)
  .returning('*');

exports.fetchUserById = username => connection
  .select('*')
  .from('users')
  .where('username', username);
