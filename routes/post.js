const express = require('express');
const router = express.Router();

const postController = require('../controllers/post_controllers');
const passport = require('../config/passport-local-strategy')
// --------------------------------

router.post('/create', passport.checkAuthentication, postController.create);
router.get('/showAllPostsAccordingToUsers', postController.showAllPostsAccordingToUsers);


//---------------------------------
module.exports = router;