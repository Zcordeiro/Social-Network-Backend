const { User, Thought } = require('../models');

const { ObjectId } = require('mongoose').Types;


module.exports = {

  getSingleUser(req, res) {
    User.find({})
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((error) => res.status(500).json(error))
  }
}