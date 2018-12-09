var mongoose = require("mongoose");
var Schema = mongoose.Schema

var wsjSchema = new Schema ({
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
    source: {
        type: String,
        required: true
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

var Wsj = mongoose.model("Wsj", wsjSchema);

module.exports = Wsj;