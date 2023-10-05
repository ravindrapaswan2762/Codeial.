//  Couple Of Actions Over Here.

const User = require('../models/user');

module.exports.profile = async function(req, res) {
    try {
        
        if (req.user) {
            const user = await User.findOne(req.user);
            
            if (user) {
                
                return res.render('user_profile', {
                    title: 'ravindra paswan',
                    user: user.name,
                    email: user.email
                });
            }
        }
        
        return res.redirect('/users/sign-in');
    } catch (err) {
        console.log('Error:', err);
        return res.redirect('/users/sign-in');
    }
};

//render the sign-in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    });
}

//render the sign-up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){ // it's a global from passport property.
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}

module.exports.signOut = function(req, res) {
    // Clear the "myCookie" cookie
    console.log("req.cookies ", req.cookies);
    res.clearCookie('codeial');
  
    return res.redirect('back');
  };

//GET THE SIGN-UP DATA
module.exports.create = async function(req, res) {
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect('back');
    }
  
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        const newUser = await User.create(req.body);
        return res.redirect('/users/sign-in'); // Updated the redirect path
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      console.log('error in finding/creating user while signing up:', err);
      return res.redirect('back');
    }
};

module.exports.createSession = function(req, res){
    return res.redirect('/');
}
  

