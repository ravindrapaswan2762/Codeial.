
const User = require('../models/user');

//FOR reading files and delete it
const fs = require('fs');
const path = require('path');

module.exports.profile = async function(req, res) {
    try {
        
        if (req.user) {

            const user = await User.findById(req.params.id);
            
            if (user) {
                
                
                return res.render('user_profile', {
                    title: 'User Profile',
                    profile_user: user
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

//GET THE SIGN-UP DATA
module.exports.create = async function(req, res) {
    
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect('back');
    }
  
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        const newUser = await User.create(req.body);
        return res.redirect('/'); // Updated the redirect path
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      console.log('error in finding/creating user, while signing up:', err);
      return res.redirect('back');
    }
};

module.exports.createSession = function(req, res){
    req.flash('success', 'Loged in successfully!');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    
    req.logout(function(err) {
        if (err) {
            // Handle any error that might occur during logout
            console.error('Error during logout:', err);
        }

        req.flash('success', 'Logged out successfully!');
        return res.redirect('/');
    });
};


module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(error){
                if(error){
                    console.log('**********Multer error : ', error);
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    console.log('req.file : ',req.file)
                    if (user.avatar && fs.existsSync(path.join(__dirname, '..', user.avatar))) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    //This is saving the path of uploaded file into the avatar field in the user.
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save()
                return res.redirect('back');
            });

        }catch(error){
            req.flash('error', error);
            return res.redirect('back');
        }
    }else{
        req.flash('Error, Unauthorize!');
        return res.status(401).send('Unauthorized');
    }
}