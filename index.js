const express = require('express');
const path = require('path');
const port = '3000';
const app = express();


app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){ console.log("error in running the server", err);}
    console.log("express app is running on port ",port);
});