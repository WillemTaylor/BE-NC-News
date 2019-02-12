const connection = require("../db/connection");

exports.fetchUsers = () => {
  return connection.select("*").from("users");
};

exports.insertUser = users => {
  return connection("users")
    .insert(users)
    .returning("*");
};

exports.fetchUserById = username => {
  return connection
    .select("*")
    .from("users")
    .where("username", username);
};
