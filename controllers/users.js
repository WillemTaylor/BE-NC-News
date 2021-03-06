const { fetchUsers, insertUser, fetchUserById } = require('../models/users');

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  const newUser = req.body;
  insertUser(newUser)
    .then(([users]) => {
      res.status(201).send({ users });
    })
    .catch(next);
};

exports.getUserbyId = (req, res, next) => {
  const userById = req.params.user_id;
  fetchUserById(userById)
    .then(([user]) => {
      if (user) { return res.status(200).send({ user }); }
      return Promise.reject({ status: 404, msg: "user doesn't exist" });
    })
    .catch(next);
};
