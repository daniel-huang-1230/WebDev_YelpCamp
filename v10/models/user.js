var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username:String,
    password: String
});

userSchema.plugin(passportLocalMongoose);  // add all necessary methods/functionalities for authentication
module.exports = mongoose.model("User", userSchema);