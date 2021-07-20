var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');


router.get("/", function(req, res){
    res.render("landing", {currentUser: req.user});
});

//==========================
//AUTHENTICATION ROUTES
//==========================

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
     var newUser = new User({username : req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            
            req.flash("error", err.message)
            return res.redirect("/register")
        }
        passport.authenticate("local")(req, res,  function(){
            req.flash("success", "Successfully signed you up " + user.username + ":)");
            res.redirect("/campgrounds");      
        });

    });
});

//===========================
// LOGIN ROUTES...
//===========================
router.get("/login", function(req,res){
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req,res){

});

//=======================
//logout route
//=======================

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Successfully Logged Out")
    res.redirect("/login");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;