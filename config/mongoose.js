const mongoose = require('mongoose');

//connect to  the databse
mongoose.connect('mongodb://localhost/contacts_list_db');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'mongoose connection error'));

db.once('open',()=>{
    console.log('successfullt connected to the database');
});
