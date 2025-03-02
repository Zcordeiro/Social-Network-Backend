const { Schema, model } = require('mongoose');

const reactionsSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

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
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionsSchema]
},
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false
    }
);


thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});


const Thoughts = model('Thought', thoughtsSchema);

module.exports = Thoughts;