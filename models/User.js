const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./Thought')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /(^$|^.*@.*\..*$)/
        },
        thoughts: [thoughtsSchema],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
          getters: true,
        },
    }
)

const User = model('user', userSchema);

module.exports = User;