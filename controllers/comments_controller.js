const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = (req,res)=>{
    console.log(req.body.post);
   Post.findById(req.body.post, (err,post)=>{
        if(post){

            const newComment = new Comment({
                content: req.body.content,
                post: req.body.post,
                user: req.body._id
            })
            newComment.save()
            .then(data =>{
                res.json(data)
            })
            .catch(err => {
                console.log("error while creating object");
            })
            // Comment.create({
            //     content: req.body.content,
            //     post: req.body.post,
            //     user: req.user._id
            // },(err,comment)=>{
            //     // handle error
            //         if(err){
            //             console.log("error in creating comment");
            //             return;
            //         }

            //         post.comments.push(comment);
            //         post.save();

            //         res.redirect('/');

            
        }
        else{
            console.log("post not found");
        }
   });
}