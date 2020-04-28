const express = require('express');
const path = require('path');
const port = '3000';
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');



app.use(sassMiddleware({
    src:'./assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}))

app.use(express.urlencoded());

app.use(express.static('./assets'));
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressLayouts);
//extract style and script from subpages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




//settting view engine
app.set('view engine','ejs');
app.set('views','./views');



//mongostore is use to store the session cookiein db
app.use(session({
    name: 'codeial',
    secret: 'blah blah',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60*100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    (err)=>{
        console.log(err || 'connect mongo db setup ok');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){ console.log("error in running the server", err);}
    console.log("express app is running on port ",port);
});