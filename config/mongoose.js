const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/contact_db');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error Connecting DB"));

db.once('open',function(){
    console.log("Successfully connected to DB by Divya");
});