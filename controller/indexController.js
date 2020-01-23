const User = require('../models/user');
const Message = require('../models/message');
const validator = require('express-validator');
var passport = require('passport');
var bcrypt = require('bcrypt');
const { forwardAuthenticated } = require('../config/auth');


//validate fields
const validateAndSanitize = [
    validator.body('firstname','firstname cannot be empty and cannot have special characters')
    .trim()
    .isLength({min:1})
    .isAlphanumeric(),
    validator.body('lastname','lastname cannot be empty and cannot have special characters')
    .trim()
    .isLength({min:1})
    .isAlphanumeric(),
    validator.body('username','username cannot be empty and cannot have special characters')
    .trim()
    .isLength({min:1})
    .isAlphanumeric(),
    validator.body('password','firstname cannot be empty and cannot have special characters')
    .trim()
    .isLength({min:1})
    .isAlphanumeric(),
    validator.body('confirm_password','password must match').trim().custom((value,{req})=> value === req.body.password),
    validator.sanitizeBody(
		['userName', 'firstName', 'lastName', 'password', 'passwordConfirm']
	).escape()
]
//home page
exports.index = function(req,res,next)
{
    res.render('index');
};
//sign up get
exports.signUp_get = (req,res)=>
{
    
    res.render('signUp');
};
//sign up post


exports.signUp_post =
[
    validateAndSanitize,
    (req,res,next)=>
    {
        const {firstname, lastname, username, password} = req.body;
        const formErrors = [];
        const errors = validator.validationResult(req);
        if(!errors.isEmpty())
        {
            console.log(errors);
            //formErrors.push(errors.errors);
            return res.render('signUp');
        }
        User.findOne({username: username})
        .then(user =>
            {
                if(user)
                {
                    console.log('username already exsits');
                    res.render('signUp',{user:user});
                }
                else{
                    bcrypt.genSalt(10, (err,salt)=>
                    {
                        if(err)
                        {
                            console.log(err);
                            throw err;
                        }
                        bcrypt.hash(password,salt,(err,hashedPassword)=>
                        {
                            if(err)
                            {
                                console.log(err);
                                throw err;
                            }
                            const newUser = new User(
                                {
                                    firstname: firstname,
                                    lastname: lastname,
                                    username: username,
                                    password: hashedPassword
                                }
                            )
                            newUser.save(err=>
                                {
                                    if(err)
                                    {
                                        console.log(err);
                                        throw err;
                                    }
                                    console.log("sign up successfully!! login to view all messages");
                                    res.redirect('/login');
                                });

                        })

                    })
                }
            })
    }
]

//login get
exports.login_get = (req,res)=>
{
    res.render('login');
}
//login post 


exports.login_post = (req,res,next)=>
{
    passport.authenticate('local',{
        successRedirect:'/messages',
        failureRedirect:'/sign-up',
        failureFlash: true
    })(req,res,next);
}
//create message get request
exports.create_message_get = (req,res)=>
{
    console.log(req.user);
   /* if(!req.user)
    {
        res.redirect('login',{message: "you need to login to view all the messages"});
    }*/
    res.render('create-message');
}

//create message post request
exports.create_message_post = (req,res,next)=>
{
    check('msg_title').isLength({min:1}).trim().withMessage('title cannot be empty'),
    check('msg').isLength({min:1}).trim().withMessage('message cannot be empty'),
    sanitizeBody('msg_title').escape(),
    sanitizeBody('msg').escape()

        console.log(req.user);
    const message = new Message(
        {
            msg_title: req.body.title,
            msg: req.body.message,
            //user: req.user.id
        }
    ).save(err=>
        {
            if(err)
            {
                return next(err);
            }
            res.redirect('/messages');
        });
        

};
//display all messages
exports.get_messages = (req,res,next)=>
{
    Message.find({})
    .exec((err,messages)=>
    {
        if(err)
        {
            return next(err);
        }
        res.render('all_messages',{messages:messages});
    });
};
