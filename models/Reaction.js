//required
const { Schema, model } = require('mongoose');

//creating the reaction schema
const react_schema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 200
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: 
        {
            getters: true
        },
        id: false
    }
);

//export the reaction schema
module.exports = react_schema;