var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");
   
   
//CONFIG
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.get("/", function(req,res){
    
    res.render("landing");
});

//generate the seeding data
seedDB();

//INDEX ROUTE
app.get("/campgrounds", function(req, res){
    //GET all campgrounds from the database
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
  
}); 

//NEW ROUTE
app.get("/campgrounds/new", function(req,res){
    res.render("new");
});

//CREATE ROUTE
app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds/:id", function(req, res){
    
    //find the campground with the id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
           // console.log(foundCampground);
            res.render("show", {campground: foundCampground});
        }
    });
    
});
app.listen(process.env.PORT, process.env.IP, function(){

    console.log("The Yelp Camp server has started！");
});
