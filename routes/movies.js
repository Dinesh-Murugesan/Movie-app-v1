var express = require("express");
var router = express.Router({mergeParams: true});
var Movie = require("../models/movie");

router.get("/",function(req, res){
    Movie.find({}, function(err, movies){
        if(err){
            console.log(err);
        }
        else{
            console.log(movies);
            res.render("./movie/movies", {movies:movies ,currentUser: req.user});
        }
    });
});
router.get("/newmovies",isActive, function(req, res){
    res.render("./movie/newmovies");
});
router.post("/",isActive, function(req, res){
    var name = req.body.name;
    var url = req.body.url;
    var description = req.body.desc
    var newMovie  = {name:name, image:url, description: description};
    Movie.create(newMovie, function(err, movie){
        if(err){
            console.log("Oh NO, Error!!");
            console.log(err);
        }
        else{
            console.log("Created new!");
        }
    });
    // movies.push(newMovie);
    res.redirect("/movies");
});
router.get("/:id", function(req, res){
    Movie.findById(req.params.id).populate("comments").exec(function(err, found){
        if(err)
        {
            console.log(err);
        }
        else{
            res.render("./movie/show", {movie: found});
        }
    });
});
function isActive(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;