var express     = require("express"),
    app         =  express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");
   
   
seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.get("/", function(req,res){
    
    res.render("landing");
});



// Campground.create( {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg", description:"This is a beautiful granite hill!"},function(err,campground){
//   if(err){
//       console.log(err);
//   }else{
//       console.log("Newly created campground: ");
//       console.log(campground);
//   } });

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

app.get("/campgrounds/new", function(req,res){
    res.render("new");
});
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

app.get("/campgrounds/:id", function(req, res){
    
    //find the campground with the id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("show", {campground: foundCampground});
        }
    });
    
});
app.listen(process.env.PORT, process.env.IP, function(){

    console.log("The Yelp Camp server has started！");
});
