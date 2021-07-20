var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "camps" ,
        image: "https://pixabay.com/get/54e9d545494faa0df7c5d575c62b3e7f123ac3e4565870417d2a7cd297_340.png",
        description: "A summer camp or sleepaway camp is a supervised program for children or teenagers conducted during the summer months in some countries. Children and adolescents who attend summer camp are known as campers. normal Camps"
    },
    {
        name: "Cold",
        image: "https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e50744074277cd3924ac3_340.jpg",
        description: "A summer camp or sleepaway camp is a supervised program for children or teenagers conducted during the summer months in some countries. Children and adolescents who attend summer camp are known as campers. camp with gal"
    },
    {
        name: "Mountains",
        image: "https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e50744074277cd3924ac3_340.jpg",
        description: "A summer camp or sleepaway camp is a supervised program for children or teenagers conducted during the summer months in some countries. Children and adolescents who attend summer camp are known as campers. They are so big"
    }
]

function seedDb(){
    //deleting all campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log("Err");
        }
       console.log("Removed Campgrouds");
      //  then Create CampGrounds
       data.forEach(function(seed){
            Campground.create(seed, function(err, seed){
                if(err){
                    console.log("err");
                }else{
                    console.log("Campgrounds added");
                    //adding comments
                    Comment.create({
                        text: "This place is great, but i wish there were internet",
                        author: "Jitu"
                    }, function(err, comment){
                        if(err){
                            console.log("err");
                        }else{
                            seed.comments.push(comment);
                            seed.save();
                            console.log("Created new comment");
                        }
                        
                    });
                }
            });
        });
    });
    
   
   
}

module.exports = seedDb;