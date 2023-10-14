const Post = require('../models/post');
const Comment = require('../models/comment');

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

module.exports.destroy = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);
        console.log(typeof post.user.toString(), typeof req.user.id)

        if (post) {

            if (post.user.toString() === req.user.id) {
                await Post.deleteOne({ _id: req.params.id }); // Change to this line
                await Comment.deleteMany({ post: req.params.id });
                return res.redirect('back');
            } else {
                return res.status(403).send('Permission denied');
            }
        }


    } catch (err) {
        console.error('Error in deleting a post:', err);
        return res.status(500).send('Internal server error');
    }
}



