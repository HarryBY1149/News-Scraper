var db = require("../models")

module.exports = (app, cheerio, axios) => {

    app.get("/", function (req, res) {
        axios.get("https://www.washingtonpost.com/politics/?utm_term=.a90603def3a8").then(function (result) {
            var $ = cheerio.load(result.data);
            $(".story-list-story").each(function (i, element) {
                var washResult = {};
                washResult.headline = $(this).children(".story-body").children(".story-headline").children("h3").text();
                washResult.summary = $(this).children(".story-body").children(".story-description").children("p").text();
                washResult.link = $(this).children(".story-body").children(".story-headline").children("h3").children("a").attr("href");
                washResult.photo = $(this).children(".story-image").children("a").children("img").attr("src");
                washResult.source = "Wash"
                db.Article.create(washResult)
                    .then(function () {
                        console.log("wash saved")
                    })
                    .catch(function (err) {
                        console.log(err);
                    })
            })
        })
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
                db.Article.create(wsjResult)
                    .then(function () {
                        console.log("wsj saved")
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            })
        }).then(function () {
            res.redirect("/index");
        })

    })
    app.get("/index", function (req, res) {
        db.Article.find({}).sort({_id: -1}).limit(30).then(function (response) {
            console.log(response)
            var data = {};
            data.wash = response.filter(article =>  article.source === "Wash" )
            data.wsj = response.filter(article =>  article.source === "WSJ" )
            console.log(data);
            res.render("index", { data })
        }).catch(function (err) {
            console.log(err);
        })
    })
}