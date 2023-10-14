//                        template:     module.exports.actionName = function(req, res){}
const Post = require('../models/post');

module.exports.home = async function(req, res){
    
    try {
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
            allPosts: allPosts
        });
        
    } catch (err) {
        console.log('Error in fetching posts of all users from the database', err);
    }
    
}   