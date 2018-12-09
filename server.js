var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");


var app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");


// requiring in routes and supplying access to cheerio and axios
require("./routes/routes")(app, cheerio, axios);

// recommended code for hooking up mongo
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, {useNewUrlParser: true}).catch(function(err){
    console.log(err);
});

var PORT = process.env.PORT || 8080;

app.listen(PORT, function(){
    console.log("Server active and listening on port: "+ PORT);
})


