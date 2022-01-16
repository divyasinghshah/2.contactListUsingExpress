const { fuchsia } = require('color-name');
const express=require('express');
const port=8000;
const path=require('path');
const db=require('./config/mongoose');
const Contact=require('./models/contact');


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

app.get('/',function(req,res){
    // res.send("<h1>Cool!! it is running</h1>");
    // console.log(__dirname);
    // return res.render('home');
    Contact.find({},function(err,contact){
        if(err){
            console.log("Error in fetching contacts",err);
            return;
        }

        res.render('home',{
            title:"Contact Lists",
            contacts:contact
        });
    })
});
app.get('/practice',function(req,res){
    return res.render('practice',{
        title:'Let us play'
    });
});

app.post('/create-contact',function(req,res){
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log("Error in adding contact to db",err);
            return;
        }
        
        return res.redirect('/');
    });
});

app.get('/delete-contact',function(req,res){
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error in Deleting contact",err);
            return;
        }
        return res.redirect('/');
    });
    
});


app.listen(port,function(e){
    if(e){
        console.log("Error",e);
        return;
    }
    console.log("Express server is running",port);
});