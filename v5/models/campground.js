var mongoose = require("mongoose");
//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"     //ref is the name of the data model that we want to associate with
        }
    ]
});


//this following line is like the return statement in a function 
module.exports = mongoose.model("Campground", campgroundSchema);
