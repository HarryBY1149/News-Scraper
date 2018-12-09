var db = require("../models")

module.exports = (app, cheerio, axios) => {

    app.get("/scrape", function (req, res) {
        axios.get("https://www.washingtonpost.com/politics/?utm_term=.a90603def3a8").then(function (result) {
            var $ = cheerio.load(result.data);
            $(".story-list-story").each(function (i, element) {
                var washResult = {};
                washResult.headline = $(this).children(".story-body").children(".story-headline").children("h3").text();
                washResult.summary = $(this).children(".story-body").children(".story-description").children("p").text();
                washResult.link = $(this).children(".story-body").children(".story-headline").children("h3").children("a").attr("href");
                washResult.photo = $(this).children(".story-image").children("a").children("img").attr("src");
                washResult.source = "Washington Post"
                db.Wash.create(washResult)
                    .then(function () {
                        console.log("wash saved")
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            })
        }).catch(function (err) { console.log(err) });
        axios.get("https://www.wsj.com").then(function (result) {
            var $ = cheerio.load(result.data);
            $(".wsj-card").each(function (i, element) {
                var wsjResult = {};
                wsjResult.headline = $(this).children("h3").children("a").text();
                wsjResult.summary = $(this).children("div").children("p").children("span").text();
                wsjResult.link = $(this).children("h3").children("a").attr("href");
                wsjResult.photo = $(this).children("div").children("div").children("div").children("a").children("img").attr("src");
                wsjResult.source = "WSJ";
                console.log(wsjResult);
                db.Wsj.create(wsjResult)
                .then(function () {
                    console.log("wsj saved")
                })
                .catch(function (err){
                    console.log(err);
                });
            })
        }).catch(function(err){
            console.log(err);
        })

    })

}