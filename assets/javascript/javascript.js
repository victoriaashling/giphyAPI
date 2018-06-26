var buttons = ["Fred Astaire", "Cyd Charisse", "Gene Kelly", "Rita Hayworth", "Danny Kaye", "Ginger Rogers", "Donald O'Connor", "Leslie Caron"];

function createButtons() {
    $("#choiceButtons").empty();
    for (var i = 0; i < buttons.length; i++) {
        var buttonValue = buttons[i];
        var newButton = $("<button class='btn btn-outline-secondary' id='" + buttonValue + "'>" + buttonValue + "</button>");

        $("#choiceButtons").append(newButton);
    }
};
createButtons();


$("#submitChoice").click(function() {
    var newChoice = $("#newChoices").val();
    buttons.push(newChoice);
    
    createButtons();
});

var ratings = [];
var stillImages = [];
var animatedImages = [];

$(document).on("click", "button", function() {
    var currentId = $(this).attr("id");
    console.log(currentId);

    if (currentId !== "submitChoice") {

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=drYmDCU9rxuqHR5Q3VZpGxiH6jroV7TQ&q=" + $(this).attr("id");
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            
            $("#gifsDisplay").empty();
            ratings = [];
            stillImages = [];
            animatedImages = [];

            for (var i = 0; i < 10; i++) {
                ratings.push(response.data[i].rating);
                stillImages.push(response.data[i].images.fixed_height_still.url);
                animatedImages.push(response.data[i].images.fixed_height.url);

                var gifDiv = $("<div>").addClass("gif-div");
                var gifLink = $("<img src='" + stillImages[i] + "' id='img-" + i + "'>")
                gifDiv.append(ratings[i], gifLink);
                
                $("#gifsDisplay").append(gifDiv);
            };
        });
    };

});

$(document).on("click", "img", function() {
    var currentSrc = $(this).attr("src");
    var imgID = $(this).attr("id");
    var imgIndex = imgID.slice(4);

    console.log(currentSrc, imgID, imgIndex);

    if (currentSrc.includes("_s")) {
        $(this).attr("src", animatedImages[imgIndex]);
    }
    else {
        $(this).attr("src", stillImages[imgIndex]);
    }
});