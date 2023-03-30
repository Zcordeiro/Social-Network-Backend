const { Thought, User } = require('../models');

const { ObjectId } = require('mongoose').Types;


module.exports = {

    getThoughts(req, res) {
        Thought.find({})
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
            .then((thoughts) => res.json(thoughts))
            .catch((error) => res.status(500).json(error))
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thoughts) => {
                if (!thoughts) {
                    res.status(404).json('Failed to create thought')
                }

                User.findByIdAndUpdate(req.body.userId,
                    { $push: { thoughts: thoughts._id } },
                    { new: true }).then((user) => {
                        if (!user) {
                            res.status(404).json('No user found with this id')
                        }
                        res.status(200).json({
                            message: 'Thought created successfully',
                            user
                        })
                    })
            })
            .catch((error) => res.status(500).json(error))
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true })
            .then((thoughts) => {
                if (!thoughts) {
                    res.status(404).json('No thought found with this id')
                }
                res.status(200).json({
                    message: 'Thought updated successfully',
                })
            })
            .catch((error) => res.status(500).json(error))
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({
            _id: req.params.id 
        })
        .then((thoughts) => {
            if (!thoughts) {
                res.status(404).json('No thought found with this id')
            }
            res.status(200).json({
                message: 'Thought deleted successfully',
            })
        })
        .catch((error) => res.status(500).json(error))
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { reactions: req.body } },
            { new: true }
        )
            .then((thoughts) => res.json(thoughts))
            .catch((error) => res.status(500).json(error))
    },

    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then((thoughts) => res.json(thoughts))
            .catch((error) => res.status(500).json(error))
    },

}