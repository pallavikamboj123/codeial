const Post = require('../models/post');


module.exports.create = (req,res)=>{
    // creating a new post and saving to database according to defined schema
    const newPost = new Post({
        content: req.body.content,
        user: req.user._id
    })
    //finally saving to db
   newPost.save()
   //after saving logging the data 
   .then(data => {
       console.log(data);
   })
   //error handling as usual
   .catch(err => {
       console.error(err)
   })
}