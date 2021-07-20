var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middlewareObj = {};

middlewareObj.checkOwnership = function(req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundid){
                if(err){
                    req.flash("error", "Campground not found!");
                    res.redirect("back");
                }else{
                    if(foundid.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash("error", "You don't have permission to do that!!");
                        res.redirect("back")
                    }
                }
           });
        }else{
            req.flash("error", "You need to logged in first to do that!!");
             res.redirect("back")
        }
    }

middlewareObj.checkCommentOwnership = function(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundCommentid){
                if(err){
                    req.flash("error", "Comment not found!");
                    res.redirect("back")
                }else{
                    if(foundCommentid.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash("error", "You don't have permission to do that!!");
                        res.redirect("back")
                    }
                }
           });
        }else{
            req.flash("error", "You need to logged in first to do that!!");
             res.redirect("back")
        }
    }
middlewareObj.isLoggedIn = function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You need to logged in first to do that!!");
        res.redirect("/login");

}
module.exports = middlewareObj;
