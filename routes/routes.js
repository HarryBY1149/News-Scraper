var db = require("../models")

module.exports = (app, cheerio, axios) => {

    app.get("/", function (req, res) {
        axios.get("https://www.washingtonpost.com/politics/?utm_term=.a90603def3a8").then(function (result) {
            var $ = cheerio.load(result.data);
            $(".story-list-story").each(function(i, element){
                var nytResult = {};
                nytResult.headline = $(this).children(".story-body").children(".story-headline").children("h3").text();
                nytResult.summary = $(this).children(".story-body").children(".story-description").children("p").text();
                nytResult.link = $(this).children(".story-body").children(".story-headline").children("h3").children("a").attr("href");
                nytResult.photo = $(this).children(".story-image").children("a").children("img").attr("src");
                db.Nyt.create(nytResult).then(function (result) {
                    console.log(result);
                    console.log("+++++++++++++++++++++++");
                }).catch(function (err) {
                    console.log(err);
                })
            })
        }).catch(function (err) { console.log(err) });
        res.render("index", { msg: "Scrapes Complete" })
    })
}