var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds"),
    User            = require("./models/user"),
    Comment         = require("./models/comment");
   
   
//CONFIG
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
//tell express to serve the public directory
app.use(express.static(__dirname+"/public"));
app.set("view engine", "ejs");
//generate the seeding data
seedDB();


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Daniel for the W",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));  //User.authenticate() is implemented for us by passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//LANDING PAGE
app.get("/", function(req,res){
    
    res.render("landing");
});



//INDEX ROUTE
app.get("/campgrounds", function(req, res){
    //GET all campgrounds from the database
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
  
}); 

//NEW ROUTE
app.get("/campgrounds/new", function(req,res){
    res.render("campgrounds/new");
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
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});

//=====================
//  COMMENTS ROUTES
//=====================

//NEW ROUTE
app.get("/campgrounds/:id/comments/new", function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground:campground}); //pass in the data campground to our template
        }
    });
    
});

//CREATE ROUTE
app.post("/campgrounds/:id/comments", function(req, res){
    //look up campground using ID
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
             //create new comment
            Comment.create(req.body.comment,function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect to the SHOW page
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });
});

//AUTH ROUTES

//show the Register form
app.get("/register", function(req,res){
    res.render("register");
});

//handle sign up logic
app.post("/register", function(req,res){
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
app.get("/login", function(req,res){
    res.render("login");
});

//handle login logic
//notice the second argument here is what's called the "middleware"
//i.e. app.post("/login", middleware, callback)
app.post("/login", passport.authenticate("local",
    {   successRedirect:"/campgrounds",
        failureRedirect: "/login"}), function(req,res){
      //don't really have to do anything in the callback after the middleware is run
});

//lastly, logout route
app.get("/logout", function(req,res){
    req.logout();  //this is the method that comes with the awesome passport package
    res.redirect("/campgrounds");
});
app.listen(process.env.PORT, process.env.IP, function(){

    console.log("The Yelp Camp server has started！");
});
