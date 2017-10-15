var mongoose = require("mongoose");

var Campground = require("./models/campground");

var Comment = require("./models/comment");

var data = [
        {
            name: "Cloud Rest", 
            image:"https://farm9.staticflickr.com/8161/7360193870_cc7945dfea.jpg",
            description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        },
        {
            name: "Forest Set", 
            image:"https://farm9.staticflickr.com/8038/7930463550_42c3f82870.jpg",
            description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
        },
        {
            name: "Seaside Site", 
            image:"https://farm4.staticflickr.com/3487/3753652204_a752eb417d.jpg",
            description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
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