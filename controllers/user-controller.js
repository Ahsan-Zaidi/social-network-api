const { User, Thought } = require('../models');

const userController = {
    //get All users
    getAllUser(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    //get a single user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            }).catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    //Post a new User
    createUser({body}, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    //Update user by id
    updateUserById({ params, body}, res) {
        User.findOneAndUpdate({ _id: params.id}, body, { new: true})
            .then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No User found with this id!' });
                }
                res.json(dbUserData);
            }).catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },
}