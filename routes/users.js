const express = require('express');
const router = express.Router();
const passport = require('passport');
//--------------------------------

const userController = require('../controllers/users_controller');//accessing user controlling

// if 'passport.checkAuthentication' is true then only the 'controllers.profile' called and render profile page, otherwise not.
router.get('/profile', passport.checkAuthentication, userController.profile);

router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.get('/users/sign-out', userController.signOut);
router.post('/create', userController.create);

router.post('/create-session', passport.authenticate(
    'local', 
    { failureRedirect: '/users/sign-in' }
), userController.createSession);


//--------------------------------
module.exports = router;
