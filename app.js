var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodoverride  = require('method-override'),
    mongoose        = require("mongoose"),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    methodOverride  = require('method-override'),
    flash           = require('connect-flash'),
    Campground      = require("./models/campground"),
    Comment         = require('./models/comment'),
    User            = require('./models/user'),
    seedDb          = require("./seed");

var campgroundRoutes = require('./routes/campgrounds'),
    commentRoutes    = require('./routes/comments'),
    indexRoutes       = require('./routes/index');
    
    // seedDb();

mongoose.connect("mongodb://localhost/yelp_camp",  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
require('dotenv').config();
// var port = process.env.PORT;

// var database = require('./db');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodoverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodoverride("_method"));
app.use(flash());
app.use(require("express-session")({
    secret: "nothing",
    resave: false,
    saveUninitialized: false
}));
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//==========================
//PASSPORT CONFIG
//==========================


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(indexRoutes);
app.use(commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000, function(){
    console.log("hosted!");
});
