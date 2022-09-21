//Schema models required from mongoose
const { User, Thought, Reaction } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    //get a single thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thoughts found with this id!' });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    //Create a new Thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => {
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                )
                .then(dbThoughtData => {
                    if (!dbThoughtData) {
                        res.status(404).json({ message: 'No Thought found with this id!' });
                        return;
                    }
                    res.json(dbThoughtData);
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json(err)
                })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    //updating Thought by id
    updateThoughtById({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thoughts found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    //remove a Thought by its id
    removeThoughtById({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No Thought found with this id!' });
                }
                return User.findOneAndUpdate(
                    { _id: deletedThought.userId },
                    { $pull: { thoughts: params.id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.json({ message: "Successfully Deleted Reaction!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
        //add a reaction
        addReaction({ params, body }, res) {
            Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No Thoughts found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
        },
        //remove a reaction
        removeReaction({ params }, res) {
            Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true }
            )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json({ message: "Successfully Deleted Reaction!" });
            })
            .catch(err => res.json(err));
        }
};

module.exports = thoughtController;