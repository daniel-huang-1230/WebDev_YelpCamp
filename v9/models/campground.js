var mongoose = require("mongoose");
//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId, //this is a reference to a User model id
            ref: "User"    //ref is the name of the data model that we want to refer to
        },
        //notice we could've not put username here and just retrieve it from the User model, but since we need to access it frequently, it's better to
        //just store it here instead of accessing the User object everytime
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"     //ref is the name of the data model that we want to associate with
        }
    ]
});


//this following line is like the return statement in a function 
module.exports = mongoose.model("Campground", campgroundSchema);
