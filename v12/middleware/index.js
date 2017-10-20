var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
//all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    //check if user is logged in at all
    if(req.isAuthenticated()){
        
        Campground.findById(req.params.id, function(err,foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            }else{
                //then check if the user owns the campground
                //DON'T USE == or === because these two ids are of DIFFERENT TYPES!!!
                if(foundCampground.author.id.equals(req.user._id)){
                    next(); //move on, good to go
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");  //take the user directly to the previous page 
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    //check if user is logged in at all
    if(req.isAuthenticated()){
        
        Comment.findById(req.params.comment_id, function(err,foundComment){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            }else{
                //then check if the user owns the comment
                //DON'T USE == or === because these two ids are of DIFFERENT TYPES!!!
                if(foundComment.author.id.equals(req.user._id)){
                    next(); //move on, good to go
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");  //take the user directly to the previous page 
    }
};

//define our own middleware to check if the user is logged in (only so he/she can add new comment)
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    //else if the user is not logged in
    req.flash("error", "Please log in first!");
    res.redirect("/login");
}
module.exports = middlewareObj;