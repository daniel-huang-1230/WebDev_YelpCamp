var express     = require("express");
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var router      = express.Router({mergeParams: true});  //important to mergeParams so that our findById works as expected



//Comments New
//note how we pass the MIDDLEWARE we've defined--isLoggedIn    
router.get("/new", isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground}); //pass in the data campground to our template
        }
    })
});

//Comments Create
router.post("/", isLoggedIn, function(req, res){
    //look up campground using ID
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
             //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    //add user name and id to the comment
                     req.user.username
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment 
                    comment.save();
                    campground.comments.push(comment); //connect new comment to campground
                    campground.save();
                    console.log(comment);
                    //redirect to the SHOW page
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });
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