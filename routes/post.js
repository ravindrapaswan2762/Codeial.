const express = require('express');
const router = express.Router();

const postController = require('../controllers/post_controllers');
// --------------------------------

router.post('/create', postController.create);
router.get('/showAllPostsAccordingToUsers', postController.showAllPostsAccordingToUsers);


//---------------------------------
module.exports = router;