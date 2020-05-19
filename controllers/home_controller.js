const  Post = require('../models/post');


module.exports.home = (req,res)=>{

    // Post.find({},(err,posts)=>{
    //     return res.render('home',{
    //         title:'codeial | Home',
    //         posts: posts
    //     });
    // });


   Post.find({})
   .populate('user')
   .populate({
       path: 'comments',
       populate:{
           path: 'user'
       }
   })
   .exec((err,posts)=>{
       if(err){
           console.log("error in populatng user");
           return; 
       }
       return res.render('home',{
           title: 'codeial | home',
           posts: posts
       })
   })
}



