const router = require('express').Router();

const { 
    getThoughts, 
    getThoughtById, 
    addReaction, 
    createThought,
    updateThought,
    deleteThought,
    removeReaction
 } = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);

router.route('/:id/reactions').post(addReaction);

router.route('/:id/reactions/:reactionId').delete(removeReaction);



module.exports = router;
