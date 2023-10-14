const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function (req, res) {
    try {
        const post = await Post.findById(req.body.post);

        if (post) {
            const comment = await Comment.create({
                content: req.body.comment,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment._id); // Assuming comments in the Post model is an array of comment IDs.
            post.save();

            return res.redirect('/');
        }
    } catch (err) {
        console.log('Error in creating a comment.', err);
    }
};


module.exports.destroy = async function(req, res){
    try{
        const comment = await Comment.findById(req.params.id);

        if(comment){
            if(comment.user.toString() == req.user.id){
                let postId = comment.post;

                await Comment.deleteOne({_id: req.params.id});

                try{
                    Comment.findByIdAndUpdate(postId, {$pull: {coments: req.params.id}});
                    return res.redirect('back');
                }catch(err){

                }
            }else{
                return res.redirect('back');
            }
        }
    }catch(err){

    }
}