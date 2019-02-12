const { fetchUsers, insertUser, fetchUserById } = require("../models/users");

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(console.log);
};

exports.postUser = (req, res, next) => {
  const newUser = req.body;
  insertUser(newUser)
    .then(users => {
      res.status(201).send({ users });
    })
    .catch(console.log);
};

exports.getUserbyId = (req, res, next) => {
  const userById = req.param.username;
  fetchUserById(userById)
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(console.log);
};
