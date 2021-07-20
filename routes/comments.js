var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment'); 
var middleware = require('../middleware');
//======================
//Create Comment Route
//======================

router.get("/campgrounds/:id/comment/new", middleware.isLoggedIn , function(req, res){
    Campground.findById(req.params.id, function(err, foundid){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: foundid, currentUser: req.user } );
        }
    });
});

router.post("/campgrounds/:id/comment", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, foundid){
        if(err){
            console.log("err");
        }else{
            Comment.create(req.body.comments, function(err, comment){
                if(err){
                    console.log("err");
                }else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundid.comments.push(comment);
                    foundid.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect("/campgrounds/" + foundid._id);
                }
            });
        }
    });
});

router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
     Comment.findById(req.params.comment_id, function(err, foundcomment){
        if(err){
            res.redirect("back");
        }else{
        res.render("comments/edit", {campground_id : req.params.id, comment: foundcomment});      
        } 
    });
});

router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comments, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Successfully edited comment");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Successfully deleted comment");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});



module.exports = router;