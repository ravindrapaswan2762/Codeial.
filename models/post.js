const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        
        //post belongs to a user
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        //include the array of Id's of all comments in this post schema itself.
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    }, {timestamps: true}
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;