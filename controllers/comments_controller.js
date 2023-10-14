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
