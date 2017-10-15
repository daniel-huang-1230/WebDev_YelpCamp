var mongoose = require("mongoose");

var Campground = require("./models/campground");

var Comment = require("./models/comment");

var data = [
        {
            name: "Cloud Rest", 
            image:"https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg",
            description: "It's worth re-visiting!"
        },
        {
            name: "Forest Set", 
            image:"https://farm9.staticflickr.com/8038/7930463550_42c3f82870.jpg",
            description: "It's pretty good!"
        },
        {
            name: "Seaside Site", 
            image:"https://farm4.staticflickr.com/3487/3753652204_a752eb417d.jpg",
            description: "A little bit too crowded."
        }
    ];
function seedDB() {
    //first we remove all campgrounds
    Campground.remove({}, function(err){  //remove the whole collection (everything in campgrounds)
        if(err){
            console.log(err);
        }else{
            console.log("Removed campgrounds!!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed,function(err, campground){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Added a campground");
                        //add a comment on each campground
                        Comment.create(
                            {
                                text: "This place is beautiful but I wish there were hot water.",
                                author: "Daniel"
                            },function(err,comment){
                                if(err){
                                    console.log(err);
                                }else{
                                    //data association
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("New comment created");
                                }
                            }
                        );
                    }
                });
            });
        }
    });
   
    
}

module.exports = seedDB;   //not seedDB() b/c we are not running the function here yet