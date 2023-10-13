const express = require('express');
const router = express.Router();
const passport = require('passport');
//--------------------------------

const userController = require('../controllers/users_controller');//accessing user controlling
const postController = require('../controllers/post_controllers');

// if 'passport.checkAuthentication' is true then only the 'controllers.profile' called and render profile page, otherwise not.
router.get('/profile', passport.checkAuthentication, userController.profile);

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.get('/sign-out', userController.signOut);
router.post('/create', userController.create);
router.post('/posts', postController.post);

// user is signing-in using 'passport.authenticate' where 'local' authentication strategy is used.
//                             inbuild function in pasport library 
router.post('/create-session', passport.authenticate(
    'local', 
    { failureRedirect: '/users/sign-in' }
), userController.createSession);


//--------------------------------
module.exports = router;
