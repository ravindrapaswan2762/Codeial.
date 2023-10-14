const Post = require('../models/post');

module.exports.create = async function(req, res){
    
    try{
        const newPost = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        return res.redirect('back');

    }catch(err){
        if(err){
            console.log('Error in creating a post.')
        }
    }

}

module.exports.showAllPostsAccordingToUsers = async function(req, res){
    try{
        const allPost = await Post.find({user: req.user._id});

        return res.render('../views/post', {
            title: 'Post Page',
            allPost: allPost
        });
    }catch(err){
        console.log('Eror in fetching the user posts from database.')
    }
}