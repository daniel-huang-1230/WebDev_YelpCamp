var express     = require("express");
var Campground  = require("../models/campground");
var Comment  = require("../models/comment");
var router      = express.Router();

//INDEX ROUTE
router.get("/", function(req, res){
    //GET all campgrounds from the database
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{                             //notice the currentUser part is required for every route, we didn't have to add it mamually since we 
                                            // have handled on the top --i.e. app.use(function(req,res,next))  req.locals......
            res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser:req.user});
        }
    });
  
}); 

//NEW ROUTE
router.get("/new", function(req,res){
    res.render("campgrounds/new");
});

//CREATE ROUTE
router.post("/", function(req, res){
    //get data from the form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var des = req.body.description;
    var newCampground = {name:name, image:image, description:des};
    
    //add the newly created campground to the database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            //yes we do have two campgrounds routes, but for redirect,
            //the default route is to the GET request
            res.redirect("/campgrounds");   
        }
    });
});


//SHOW ROUTE
router.get("/:id", function(req, res){
    
    //find the campground with the id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
           // console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});


module.exports = router;