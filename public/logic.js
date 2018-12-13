console.log("here's a page")
$(document).ready(function () {
    console.log("page is loaded")
    $("#scrape").on("click", function (event) {
        event.preventDefault();
        $.get("/scrape").then(function () {
            console.log("scrape complete");
            location.reload();
        })
    });

    $("#clicker").on("click", function (event) {
        console.log("you clicked me!")
        const id = $("#id").attr("data-id");
        const newComment = {
            author: $("#comment-author").val().trim(),
            comment: $("#comment-body").val().trim()
        };
        console.log(id, newComment);
        $.ajax({
            url: "/comment/" + id,
            method: "POST",
            data: newComment
        }).then(function (respone) {
            location.reload();
        })
    })
})
