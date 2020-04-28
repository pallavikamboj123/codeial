const User = require('../models/user');


module.exports.profile = (req,res)=>{
    return res.render('profile',{
        email: req.email,
        name: req.name
    });
}


module.exports.signUp = (req,res)=>{

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signUp',{
        title: 'sign up'
    });
}

module.exports.signIn = (req,res)=>{

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('signIn',{
        title:'login page'
    });
}

//post for singup
module.exports.create = (req,res)=>{
    if(req.body.password != req.body.confirmpassword){
        console.log("passwords don't match");
        return res.redirect('back');
    }

    if(User.findOne({email: req.body.email}, (err,user)=>{
        if(err){
            console.log("error in finding user in signing up");
            return;
        }

        if(!user){
            User.create(req.body, (err,user)=>{
                if(err){
                    console.log("error in creating user");
                    return;
                }

                return res.redirect('/users/sign-in');
            })
        }
        else{
            console.log('user already created find new email');
            return res.redirect('back');
        }
       

    }));
}


//post sign in
module.exports.createSession = (req,res)=>{
    return res.redirect('/users/profile');
}



//sign out
module.exports.destroySession = (req,res)=>{
    req.logout(); //passport gives this funiton to request
    return res.redirect('/');
}


