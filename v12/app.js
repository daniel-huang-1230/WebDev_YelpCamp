var express         = require("express"),
    app             = express(),
    flash           = require("connect-flash"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds"),
    MethodOverride  = require("method-override"),
    User            = require("./models/user"),
    Comment         = require("./models/comment");
    
//REQUIRING ALL ROUTES    
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");
   
   
//CONFIG
mongoose.connect("mongodb://localhost/yelp_camp_v12",{
    useMongoClient: true,
});
app.use(bodyParser.urlencoded({extended:true}));
//tell express to serve the public directory
app.use(express.static(__dirname+"/public"));
app.use(MethodOverride("_method"));
app.set("view engine", "ejs");
app.use(flash());  //to use connect-flash package

//generate the seeding data
//seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Daniel for the W",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());  
//User.authenticate() is implemented for us by passport-local-mongoose
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//another middleware that we created

app.use(function(req,res,next){
    res.locals.currentUser = req.user;  //res.locals is whatever we have in our current template, pass req.user to EVERY TEMPLATE
    res.locals.error    = req.flash("error");  //the "error" here is a key of connect-flash
    res.locals.success  = req.flash("success");
    next();    //IMPORTANT!! we need this line to move on to the next step (callback in most of our cases)
});


app.use("/campgrounds/:id/comments", commentRoutes); //prepend "/campgrounds/:id/comments" to all routes in commentsRoute file
app.use("/campgrounds", campgroundRoutes);           //prepend "/campgrounds" to all routes in campgroundRoutes file
app.use("/", indexRoutes);   

app.listen(process.env.PORT, process.env.IP, function(){

    console.log("The Yelp Camp server has started！");
});
