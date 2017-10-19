var express = require("express");
var router = express.Router();
var passport = require("passport");
var User     = require("../models/user")

// Root route
router.get("/", function(req,res){
    
    res.render("landing");
});


//AUTH ROUTES

//show the Register form
router.get("/register", function(req,res){
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    //notice here we DO NOT pass in the "password" into the new uer object
    //rather, we pass it in as another parameter and passport-local-mongoose will 
    //"HASH" the password for us
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("register"); //short-circuit and show again the register form
        }
        passport.authenticate("local")(req,res, function(){
            res.redirect("/campgrounds"); //log the user in
        });
    } );
});

//show login form
router.get("/login", function(req,res){
    res.render("login");
});

//handle login logic
//notice the second argument here is what's called the "middleware"
//i.e. app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local",
    {   successRedirect:"/campgrounds",
        failureRedirect: "/login"
    }), function(req,res){
      //don't really have to do anything in the callback after the middleware is run
});

//lastly, logout route
router.get("/logout", function(req,res){
    req.logout();  //this is the method that comes with the awesome passport package
    res.redirect("/campgrounds");
});

//define our own middleware to check if the user is logged in (only so he/she can add new comment)
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //else if the user is not logged in, redirect back to the login page
    res.redirect("/login");
}

module.exports = router;