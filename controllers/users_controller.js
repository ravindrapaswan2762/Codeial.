//  Couple Of Actions Over Here.

const User = require('../models/user');

module.exports.profile = async function(req, res) {
    // try {
    //     if (req.cookies.user_id) {
    //         const user = await User.findById(req.cookies.user_id);
            
    //         if (user) {
    //             return res.render('user_profile', {
    //                 title: 'User Profile',
    //                 user: user.name,
    //                 email: user.email
    //             });
    //         }
    //     }
        
    //     return res.redirect('/users/sign-in');
    // } catch (err) {
    //     console.log('Error:', err);
    //     return res.redirect('/users/sign-in');
    // }
    return res.render('home', {title: "heyyyyy"});
};


//render the sign-up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'Codeial | Sign Up'
    });
}
//render the sign-in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: 'Codeial | Sign In'
    });
}
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
  

