const { User, Thought } = require('../models');

const { ObjectId } = require('mongoose').Types;


module.exports = {

  getAllUser(req, res) {
    User.find({})
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .select('-__v')
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .then((users) => res.json(users))
      .catch((error) => res.status(500).json(error))
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((error) => res.status(500).json(error))
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({
      _id: params.id
    },
    { $set: body }, 
    { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).json('No user found with this id')
      }
      res.status(200).json({
        message: 'User updated successfully',
        user
      })
    })
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({
      _id: params.id
    })
    .then((user) => {
      if (!user) {
       return res.status(404).json('No user found with this id')
      }
      return Thought.deleteMany({ _id: { $in: user.thoughts } })
    }).then(() => {
      res.status(200).json({
        message: 'User deleted successfully',
      })
    })
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((users) => res.json(users))
      .catch((error) => res.status(500).json(error))
  },

  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((users) => res.json(users))
      .catch((error) => res.status(500).json(error))
  }
}