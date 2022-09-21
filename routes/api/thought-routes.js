//required filed from express
const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThoughtById,
    removeThoughtById,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller')

//Post and get routes for Thought
router
.route('/')
.get(getAllThoughts)
.post(createThought)

//routes for crud operations requiring id for Thoughts
router
.route('/:id')
.get(getThoughtById)
.put(updateThoughtById)
.delete(removeThoughtById)

router
.route('/:thoughtId/reactions')
.post(addReaction)
.delete(removeReaction)

module.exports = router;