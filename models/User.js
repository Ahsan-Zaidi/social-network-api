//require model and schema from mongoose
const { model, Schema } = require('mongoose');

//Create the User schema
const user_schema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJson: {
            virtuals: true
        },
        id: false
    }
);

//capture the length of the users friends
user_schema.virtual('friendCount').get(function(){
    return this.friends.length;
})

//create the User model
const User = model('User', user_schema);

//exporting the User model
module.exports = User;