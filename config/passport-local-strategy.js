const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    (email,password, done)=>{
        //find a user and establish the identity
        User.findOne({email: email}, (err,user)=>{
            if(err){
                console.log('error while finding user --> passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('invalid username password');
                return done(null,false);
            }

            return done(null, user);

        });
    }
));


//serialize user
passport.serializeUser((user, done)=>{
    done(null,user.id);
});


//deserialize user
passport.deserializeUser((id, done)=>{
    User.findById(id, (err,user)=>{
        if(err){
            console.log("in deserialzing user");
            return done(err);
        }

        return done(null,user);
    });
});


//check if user is authenticated
passport.checkAuthentication = (req,res,next)=>{

    //passport add isauthenticated function with every req so if user is signed in pass it to the next middleware
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not singed in
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = (req,res,next)=>{
    if(req.isAuthenticated()){

//req.user contains curr signed in user from session cookie and we are sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}



module.exports = passport;
