var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
const user = require('../models/user');
var middleware = require('../middleware');
 
//==========================
// CAMPGROUNDS ROUTES 
//==========================

router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log("error");
            }else{
                res.render("campgrounds/index",  {camp : allCampgrounds , currentUser: req.user});
            }
    });
    
});

router.post("/", function(req, res){
            var name = req.body.name;
            var url = req.body.imgurl;
            var description = req.body.description;
            var price = req.body.price;
            var author = {
                id: req.user._id,
                username : req.user.username
            }
            var newcampground = {name: name , image: url, description: description, author: author, price: price};
            // campgrounds.push(newcampground);
            //now newly created data is going to db

            Campground.create(newcampground, function(err, newlycreated){
                if(err){
                     console.log("error")
                }else{
                    req.flash("success", "Successfully added campground");
                    res.redirect("/campgrounds");
                }
            });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new", {currentUser: req.user});
});

router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundid){
           if(err){
               console.log("error");
           }else{
            //    console.log(foundid);
               res.render("campgrounds/show", {campground : foundid , currentUser: req.user});
           }
    });     
});

router.delete("/:id", middleware.checkOwnership, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            req.flash("success", "Successfully deleted campground");
            res.redirect("/campgrounds");
        }
    });
});

router.get("/:id/edit", middleware.checkOwnership, function(req, res){
        
          Campground.findById(req.params.id, function(err, foundid){
              res.render("campgrounds/edit", {  campground:foundid })
          })
    
    
});

router.put("/:id", middleware.checkOwnership, function(req, res){
 
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, newlyUpdated){
            if(err){
                console.log(err);
            }else{
                req.flash("success", "Successfully edited campground");
                res.redirect("/campgrounds/" + req.params.id);
            }
    });
});



module.exports = router;