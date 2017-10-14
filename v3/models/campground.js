var mongoose = require("mongoose");
//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});


//this following line is like the return statement in a function 
module.exports = mongoose.model("Campground", campgroundSchema);
