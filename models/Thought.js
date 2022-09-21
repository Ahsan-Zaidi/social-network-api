//required files
const { model, Schema } = require('mongoose');
const reactionSchema = require('./Reaction');

//Creates the Thought Schema
const thought_schema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
)

//capture the reactions attatched to thoughts 
thought_schema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

//creating the Thought model
const Thought = model('Thought', thought_schema);

//exporting the Thoughts model
module.exports = Thought;