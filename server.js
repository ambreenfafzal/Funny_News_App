var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
// var request = require ("request");

// // Our scraping tools
// // Axios is a promised-based http library, similar to jQuery's Ajax method
// // It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// // Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// // Configure middleware

// // Use morgan logger for logging requests
app.use(logger("dev"));
// // Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// // Make public a static folder
app.use(express.static("public"));

// // Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/goodnews";
mongoose.connect(MONGODB_URI);

// // Routes

// // A GET route for scraping the New Yorker website
app.get("/scrape", function(req, res) {
    axios.get( "https://www.newyorker.com/humor/borowitz-report").then(function(response) {

    var $ = cheerio.load(response.data);
    $("a h4").each(function(i, element) {
        var result = {};
        result.title = $(this).text();
        // console.log(result.title);
// Create a new Article using the `result` object built from scraping
      db.Article.create(result).then(function(dbArticle){
          res.json(dbArticle)
//view the added result in the console
      }).catch(function(err){
          // If an error occured, log it
          console.log(err);
      });

});
});

});


 // Route for getting all Articles from the db
app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({}).then(function(dbArticle){
// If successful , send them back to the client
res.json(dbArticle);
    }).catch(function(err){
         // If an error occurred, send it to the client
         res.json(err);
    });

});

//Route for grabbing a specific Article by id, populate it with it's note
app.get("/articles/:id", function(req, res){
// Using the id passed in the id parameter, this query will find the matching one in our db
db.Article.findOne({_id: req.params.id})
// populate all the notes associated with it
.populate("note")
.then(function(dbArticle){
    // If successful, send it back to client
    res.json(dbArticle);
})
.catch(function(err){
    //If errors, send them to client
    res.json(err);
});

});

// Route for saving/updating an Article's associated Note
app.post("/articles/:id", function (req, res){

    // This will create a new note and pass the req.body to the entry
    db.Note.create(req.body)
    .then(function(dbNote){
        console.log(dbNote)
        //If note was created successfully, find one Article with an '_id' equal to 'req.params.id'
        //Update the article to be associated with the new note.
      //  {new:true}tells the query that we want it to return the update user.
        return db.Article.findOneAndUpdate({_id:req.params.id}, {note:dbNote._id}, {new:true});
    })
    .then(function(dbArticle){
        //If article successfully update, send it back to the client
        res.json(dbArticle);
    })
    .catch(function(err){
        //If there is an error, send it to the client
        res.json(err);
    })
})

app.listen(PORT);
console.log("Listning on " + "http://localhost:" + PORT);
