var express     = require("express");
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");
var middleware  = require("../middleware");
var router      = express.Router({mergeParams: true});  //important to mergeParams so that our findById works as expected



//Comments New
//note how we pass the MIDDLEWARE we've defined--isLoggedIn    
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
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

//Comment EDIT route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id: req.params.id, comment:foundComment});  
            //notice here the params.id is the "campground's id", remember how we set up the router
        }
    });
    
});

//Comment UPDATE route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }else{
            //successfully updated, send the user back to the comment show page
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//Comment DESTROY route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            //redirect to the "Campground" show page
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});



module.exports = router;