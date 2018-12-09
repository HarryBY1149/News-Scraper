var mongoose = require("mongoose");
var Schema = mongoose.Schema

var nytSchema = new Schema ({
    headline: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: false
    },
    compare: {
        type: Boolean,
        default: false
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "comments"
    }]
});

var Nyt = mongoose.model("Nyt", nytSchema);

module.exports = Nyt;