const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    
    try{
        const newPost = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        // receiving through Ajax and returning back data as json formate-------- 
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: newPost
                },
                message: "Post Created"
            });
        }
        // ----------

        req.flash('success', 'Post Published!');
        return res.redirect('back');

    }catch(err){
        if(err){
            req.flash('error', err.message);
            return res.redirect('back');
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

        if (post) {

            if (post.user.toString() === req.user.id) {
                await Post.deleteOne({ _id: req.params.id }); // Change to this line
                await Comment.deleteMany({ post: req.params.id });

                if(req.xhr){
                    return res.status(200).json({
                        data: {
                            post_id: req.params.id
                        },
                        message: 'Post Deleted Successfully!'
                    })
                }

                req.flash('success', 'Post and associated commnts Deleted Successfully!')
                return res.redirect('back');
            } else {
                req.flash('error', 'You can not delete this post!');
                return res.redirect('back');
            }
        }


    } catch (err) {
        req.flash('error', err.message);
        return res.redirect('back');
    }
}



