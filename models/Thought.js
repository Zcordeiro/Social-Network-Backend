const { Schema, model } = require('mongoose');
const reactionsSchema = require('./Reactions')

const thoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: [
        {
            type: Schema.Types.username,
            ref: 'User',
        }
    ],
    reactions: [reactionsSchema]
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Thoughts = model('thought', thoughtsSchema);

module.exports = Thoughts;