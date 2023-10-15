//                        template:     module.exports.actionName = function(req, res){}
const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    
    try {
        const users = await User.find({});

        const allPosts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .exec();
    
        return res.render('home', {
            title: 'Codeial | Home',
            allPosts: allPosts,
            allUsers: users
        });
        
    } catch (err) {
        console.log('Error in fetching posts of all users from the database', err);
    }
    
}   

