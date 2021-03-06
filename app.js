var express = require("express"),
    app = express(),
    expressSession = require("express-session");
    passport = require("passport");
    passportLocal=require("passport-local"),
    passportMongoose= require("passport-local-mongoose"),
    bodyParse = require("body-parser"),
    mongoose = require("mongoose"),
    seedDb = require("./seed"),
    User = require("./models/user");

var indexRoutes = require("./routes/index"),
    commentRoutes = require("./routes/comments"),
    movieRoutes = require("./routes/movies");

seedDb();
// mongoose.connect("mongodb://localhost/movie-app-v6",{useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true, useUnifiedTopology: true});
mongoose.connect("mongodb+srv://Dinesh:Dinesh95@cluster0-ijqoh.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true, useUnifiedTopology: true}); 

var Movie = require("./models/movie");
var Comment = require("./models/comments");
app.set("view engine", "ejs");

app.use(bodyParse.urlencoded({extended: true}));
app.use(expressSession({
    secret: "I am Super",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());    
app.use(express.static(__dirname+"/public"));

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/movies", movieRoutes);
app.use("/movies/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Connected!!!");
});