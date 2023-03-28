const { Thought } = require('../models');

const { ObjectId } = require('mongoose').Types;


module.exports = {

  getThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughts) => res.json(thoughts))
      .catch((error) => res.status(500).json(error))
  },

}