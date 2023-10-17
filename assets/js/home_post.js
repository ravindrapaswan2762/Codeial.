{
   // method for submit the form data to SERVER for new post using AJAX.
   let createPost = function(){
        let newPostForm = $('#new-form-post');
        
        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                   let newPost = newPostDom(data.data.post);
                   $('#post-list-container>ol').prepend(newPost);
                   deletePost($(' .delete-post-button', newPost))// delete-post-button seted in each newPost,
                                                                 // one extra space needed, before writing className
                }, 
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });

   }

   let newPostDom = function(post){
    console.log('post : ', post)
    return $( 
        `<li id="post-${post._id}">
        
            <small style="font-weight: bolder;">${post.user}: </small>
            <small style="font-weight: bolder;">${post.content} </small>

            <!-- ---------------------------------------------------------Comment Form -->

            <div class="post-comment">
                    <form action="/comments/create" method="POST">
                        <input type="text" name="comment" placeholder="Type here to add comment.." >
                        <input type="hidden" name="post" value="${post._id}" >
                        <input type="submit" value="Add Comment">
                    </form>

                <!-- -------------------------------------------------------- Post Delete -->

                <p> 
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete</a>
                    </small>
                </p>

                <!-- -------------------------------------------------------- post wise all comments-->
                
            </div>

            <br/>
        </li>`)
   }


  //Metod to delete a post from dom
  let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
                $(`#post-${data.data.post_id}`).remove();
            },
            error: function(error){
                console.log(error.responseText);
            }
        })
    })
  }


   createPost();



}