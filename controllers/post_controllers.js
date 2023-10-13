const Post = require('../models/post');

module.exports.post = async function(req, res){
    
    try{
        const newPost = await Post.create({
            content: req.body.content,
            user: req.user._id
        })

        const allPost = await Post.find({user: req.user._id});
        console.log('allPost: ', allPost);

        return res.render('../views/post', {
            title: 'Post Page',
            allPost: allPost
        });
    }catch(err){
        if(err){
            console.log('Error in creating a post.')
        }
    }

}