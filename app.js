/*req packages*/
const ejs = require('ejs');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const mongoose = require('mongoose');
"use strict";
const nodemailer = require("nodemailer");

var name;
var email;
var subject;
var message;

var loggedIn=false;

mongoose.connect('xxxxxxxxxxx'/*connect your database to the application*/, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


var blogPostSchema = new mongoose.Schema({

    title: String,
    body1: String,
    body2: String,
    body3: String,
    body4: String,
    body5: String,
    body6: String,
    body7: String,
    image: String
  
  
  });

var blogPost = mongoose.model('blogPost', blogPostSchema);

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));


/*get requests*/

app.get("/", function (req, res) {
    res.render("index");
});



app.get("/blog", (req,res)=>{

 

    blogPost.find({}, function (err, results) {
        if(!err){
          if(results){

            console.log(results);
            console.log('results found');

            res.render("blog", {
              postsArray: results
            })
    
          }
          else{
            console.log("nothing");
          }
        }
        else{
          console.log(err);
        }
      });

    // res.render("blog", {
    //     postsArray: postsArray 
    // });



});

app.get("/blogcompose", (req,res)=>{
    if(loggedIn){
        res.render("blogcompose");
    }
    else{
        res.render("failed.ejs")
    }
    
});

app.get("/:blogName", function (req, res) {

    const requestedTitle= req.params.blogName;
    
    blogPost.findOne({ title: requestedTitle}, function (err, foundDoc) {
        if(!err){
          if(foundDoc){
              
            console.log(foundDoc);
    
            res.render("blogpost", {
              postDisTitle: foundDoc.title,
              postDisBody1: foundDoc.body1,
              postDisBody2: foundDoc.body2,
              postDisBody3: foundDoc.body3,
              postDisBody4: foundDoc.body4,
              postDisBody5: foundDoc.body5,
              postDisBody6: foundDoc.body6,
              postDisBody7: foundDoc.body7,
              postDisImage: foundDoc.image
            });
          }
    
    
        
        }
        else{
          console.log(err);
        }
      })
    
    
    // postsArray.forEach(post => {
  
    //   const storedTitle=_.lowerCase(post.title);
  
    //   if (storedTitle === requestedTitle) {
            
    //     res.render("blogpost", 
    //     { postDisTitle : post.title,
    //        postDisBody : post.body,
    //        postDisImage : post.image
    //     }
    //     );       
    // }
   
      
    // });
  
  });


/***post request */

app.get("/blog/login", (req, res)=>{

res.render("login");

   
});

app.post("/blog/login", (req, res)=>{

    if(req.body.username==="xxxxxxx"/***yourusername */ && req.body.password==="xxxxxx"/***your password */){
        loggedIn=true;
        res.redirect("../blogcompose");
    }
    else{
        res.render("failed.ejs");
    }
    
       
    })


app.post("/blogcompose", (req, res)=>{

    if(req.body.postTitle===""){
        res.redirect("/blog");
        loggedIn = false;
    }
    else{
        var newBlogPost={
            title:req.body.postTitle,
            body1:req.body.postBody1,
            body2:req.body.postBody2,
            body3:req.body.postBody3,
            body4:req.body.postBody4,
            body5:req.body.postBody5,
            body6:req.body.postBody6,
            body7:req.body.postBody7,
            image:req.body.image
        }
        
        blogPost.create( newBlogPost, function (err, small) {
            if (err) return handleError(err);
        
            // saved!
          });
    
          loggedIn = false;
    
          res.redirect("/blog");
    }



    // var post={
    //     title:req.body.postTitle,
        // body:req.body.postBody,
        // image:req.body.image
    // }

    
    // postsArray.push(post);

    // console.log(postsArray);
    // res.redirect("/blog");
   

})


app.post("/", function (req, res) {
   name=req.body.cname; 
   email=req.body.cemail; 
   subject=req.body.csubject; 
   message=req.body.cmessage; 



// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "neal.dooley95@ethereal.email", // generated ethereal user
      pass: "YhzX6G2s18Xcq2eQnb", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: email, // sender address
    to: "nishdubb11@gmail.com", // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
    html: "<b>"+message+"</b>", // html body
    senderName:name
  });


  name="";
  subject="";
  email="";
  message="";

  res.redirect("/#contact-section");

}

main().catch(console.error);
});





let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


/*listen*/
app.listen(port, function () {
    console.log("Server started on port sccessfully");
});