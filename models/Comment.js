var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema ({
    author:{
        type: String,
        default: "anonymous"
    },
    comment: {
        type: String,
        required: true
    },
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;