const { fuchsia } = require('color-name');
const express=require('express');
const port=8000;
const path=require('path');


const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// middleware1
// app.use(function(req,res,next){
//     req.myName="Divya";
//     console.log("Middleware1 Called");
//     next();
// });

// // middleware2
// app.use(function(req,res,next){
//     console.log("MiddleWare2 called",req.myName);
//     next();
// });

var contactList=[
    {
        name:'Divya',
        phone:'1111111'
    },{
        name:'Dhruv',
        phone:'23432235'
    }
];
app.get('/',function(req,res){
    // res.send("<h1>Cool!! it is running</h1>");
    // console.log(__dirname);
    // return res.render('home');
    return res.render('home',{
        title:'Contacts List',
        contacts:contactList
    });
});
app.get('/practice',function(req,res){
    return res.render('practice',{
        title:'Let us play'
    });
});

app.post('/create-contact',function(req,res){
    contactList.push({
        name:req.body.name,
        phone:req.body.phone
    });
    // contactList.push(req.body);
    return res.redirect('/');
});


app.listen(port,function(e){
    if(e){
        console.log("Error",e);
        return;
    }
    console.log("Express server is running",port);
});