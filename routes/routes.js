var db = require("../models")

module.exports = (app, cheerio, axios) => {

    app.get("/scrape", function (req, res) {
        axios.get("https://www.washingtonpost.com/politics/?utm_term=.a90603def3a8").then(function (result) {
            var $ = cheerio.load(result.data);
            $(".no-skin.flex-item.flex-stack.normal-air.text-align-left.equalize-height-target").each(function (i, element) {
                var washResult = {};
                washResult.headline = $(this).children(".headline").children("a").text();
                washResult.summary = $(this).children(".blurb").text();
                washResult.link = $(this).children(".headline").children("a").attr("href");
                washResult.source = "Wash"
                db.Article.findOne({ "headline": washResult.headline }).then(function (result) {
                    if (!result) {
                        db.Article.create(washResult)
                            .then(function () {
                                console.log("wash saved")
                            })
                            .catch(function (err) {
                                console.log(err);
                            })
                    }
                }).catch(function (err) {
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
                db.Article.findOne({ "headline": wsjResult.Headline }).then(function (result) {
                    if (!result) {
                        db.Article.create(wsjResult)
                            .then(function () {
                                console.log("wsj saved")
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    }
                })

            })
        }).then(function () {
            res.send("Scrape Successful");
        })

    })

    app.get("/", function (req, res) {
        db.Article.find({}).sort({ _id: 1 }).limit(30).then(function (response) {
            const wash = response.filter(article => article.source === "Wash")
            const wsj = response.filter(article => article.source === "WSJ")
            const data = {
                wash: wash,
                wsj: wsj
            };
            res.render("index", { data })
        }).catch(function (err) {
            console.log(err);
        })
    });

    app.get("/comment/:id/:paper", function (req, res) {
        const id = req.params.id;
        db.Article.findOne({ "_id": id })
            .populate("comments")
            .then(function (result) {
                const body = {
                    data: result,
                    paper: req.params.paper
                }
                res.render("comment", {body})
            })
    })

    app.post("/comment/:id", function(req, res){
        var comment = req.body
        db.Comment.create(comment)
        .then(function(newComment){
           return db.Article.findOneAndUpdate({"_id":id}, {$push:{"comments":newComment._id}}, {"new":true})
        })
        .then(function(updatedArticle){
            res.json(updatedArticle)
        })
        .catch(function(err){
            console.log(err);
        })
        
    })
}