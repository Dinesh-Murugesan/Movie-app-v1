var mongoose = require("mongoose");
var Movie = require("./models/movie");
var Comment = require("./models/comments");
var datas = [
    {
        name: "Bigil",
        image: "https://m.media-amazon.com/images/M/MV5BMTM3ZDc0YWItN2VhMS00ZWQyLTg5YmEtODRiY2Y5NWI1YzE4XkEyXkFqcGdeQXVyOTk3NTc2MzE@._V1_QL50_SY1000_SX750_AL_.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Kaithi",
        image: "https://m.media-amazon.com/images/M/MV5BMzNjMDhmYzEtM2YxOC00NzZjLThkODctZjI4M2UyOWIyOTZmXkEyXkFqcGdeQXVyNzcxMzI4Njk@._V1_QL50_SY1000_CR0,0,639,1000_AL_.jpg",
        description: "A drug bust, an injured cop and a convicted criminal who wants to meet his daughter for first time in life, what happens when they all cross their path is the story of this emotional action flick."
    },
    {
        name: "Petta",
        image: "https://m.media-amazon.com/images/M/MV5BNWI1NmY1ODQtZjgwYS00ZmJhLTgwZWItMTYyODRhNDc2OTZiXkEyXkFqcGdeQXVyODIwMDI1NjM@._V1_QL50_SY1000_SX750_AL_.jpg",
        description: "Though he works as a hostel warden, there is more to Kaali than meets the eye. Things take an interesting turn when Kaali's path crosses with a group of dreaded gangsters."
    },
    {
        name: "Action",
        image: "https://m.media-amazon.com/images/M/MV5BYzc5Y2Q3MTctMzU2Ni00M2RmLWJhNzMtNjQyOWUwMzJkZDNjXkEyXkFqcGdeQXVyOTk3NTc2MzE@._V1_QL50_.jpg",
        description: "An agent, sent by the Indian army to observe a terrorist, finds his mission turn complicated when he discovers undercover agents in his own country."
    }
];
function seedDB(){
    Movie.deleteMany({}, function(err){
        console.log("Removed Movies!");
        Comment.deleteMany({}, function(err){
            console.log("Removed Comments!");
            datas.forEach((data)=>{
                Movie.create(data, function(err, movie){
                    console.log("Added Movie!");
                    Comment.create({
                        text: "This is an awesome movie!",
                        author: "Hober"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        }
                        movie.comments.push(comment);
                        movie.save();
                        console.log("Created comment");
                    });
                });
            });
        })
    });
}
module.exports = seedDB;