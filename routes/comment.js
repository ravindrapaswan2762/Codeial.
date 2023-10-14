const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comments_controller');
const passport = require('../config/passport-local-strategy')
// --------------------------------

router.post('/create', passport.checkAuthentication, commentController.create);


//---------------------------------
module.exports = router;