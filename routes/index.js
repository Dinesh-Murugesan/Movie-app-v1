var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");

router.get("/", function(req, res){
    res.render("home");
});
router.get("/register", function(req, res){
    res.render("./user/register");
});

router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}),req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect("/register");
        }
            passport.authenticate("local") (req, res, function(){
            res.redirect("/movies");
        });
    });
});
router.get("/login", function(req, res){
    res.render("./user/login");
});

router.post("/login", passport.authenticate("local",{
    successRedirect: "/movies",
    failureRedirect: "/login"
}) ,function(req,res){
    if(err){
        console.log(err);
        res.redirect("/login");
    }
    else{
        res.render("./movie/movies");
    }
});
router.get("/logout", function(req, res){
    req.logOut();
    res.redirect("/");
});
function isActive(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;