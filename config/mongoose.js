const mongoose = require('mongoose');

// connect to  the databse
mongoose.connect('mongodb://localhost/codeial_development');


const db = mongoose.connection;

db.on('error',console.error.bind(console,'mongoose connection error'));

db.once('open',()=>{
    console.log('successfullt connected to the database');
});

module.exports = db;