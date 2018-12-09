var mongoose = require("mongoose");
var Schema = mongoose.Schema

var washSchema = new Schema ({
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
    source: {
        type: String,
        required: true,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "comments"
    }]
});

var Wash = mongoose.model("Wash", washSchema);

module.exports = Wash;