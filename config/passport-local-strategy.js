const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Authentication using passport
// Telling passport to use LocalStrategy[passport-local] and setting that usernameField should be 'email'
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async function(req, email, password, done) {
    try {
        // Find the user
        const user = await User.findOne({ email: email });

        if (!user || user.password !== password) {
            req.flash('error', 'Invalid Username/Password'); // 'error' is the message type
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        req.flash('error', err.message); // 'error' is the message type
        return done(err);
    }
}));



// Serializing the user, which decides which key is to be stored in the cookie in the browser.
passport.serializeUser(function(user, done) {
    return done(null, user.id);
});

// Deserializing the user, which sends the cookie from the browser to the server when the user requests data after login.
passport.deserializeUser(async function(id, done) {
    try {
        const user = await User.findById(id);
        if (!user) {
            console.log('User not found');
            return done(null, false);
        }
        return done(null, user);
    } catch (err) {
        console.error('Error in finding the user --> passport');
        return done(err);
    }
});

//Check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if user is signed-in then pass the requist to the next function(controller action).
    
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed-in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the curent signed-in user info from cookie. and i am sending just to this local for using from views.
        // console.log('req.user ', req.user);
        res.locals.user = req.user; 
        // console.log('res.locals.user ', res.locals.user);
    }
    next();
}
module.exports = passport;
