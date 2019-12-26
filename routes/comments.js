var express = require("express");
var router = express.Router({mergeParams: true});
var Movie = require("../models/movie");
var Comment = require("../models/comments")

router.get("/new",isActive, function(req, res){
    Movie.findById(req.params.id).populate("comments").exec(function(err, movie){
        if(err){
            console.log(err);
        }
        else{
            res.render("./comment/new", {movie: movie});
        }
    });
});
router.post("/", isActive,function(req, res){
    Movie.findById(req.params.id, function(err, movie){
        if(err){
            console.log(err);
        }
        else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }
                else{
                    movie.comments.push(comment);
                    movie.save();
                    console.log("Comment Created!!");
                    res.redirect("/movies/"+ req.params.id);
                }
            });
            //console.log(movie);
            // res.redirect("./movies/"+ req.params.id);
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