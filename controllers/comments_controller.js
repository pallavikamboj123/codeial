const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = (req,res)=>{
    // creating a new comment and saving to database according to defined schema
    const newComment = new Comment({
        content: req.body.content,
        user: req.user._id
    })
    // finally saving
   newComment.save()
   // after saving comment in comment collection storing it's id into post collection in comments array
   .then(data => {
       let commentID = data._id;
       let userID = data.user;
    // updating the post collection with comments id   
       Post.findOneAndUpdate({user: objectId(userID)}, {$push: {comments: commentID}}, {upsert: true}, (err, result) => {
        console.log(result);
      })
      })
      // error handling
      .catch(err => {
          console.error(err);
      })
}