// Initial array of animals
var animals = ['Cat', 'Dog', 'Lemur', 'Buffalo'];

// Generic function for displaying animal buttons 
function renderButtons(){ 
    $("#animalsView").empty(); //empties animals view
    for (var i = 0; i < animals.length; i++) {
        var a = $('<div>'); // creates blank button
        a.addClass('animal'); // add a class
        a.attr('data-animal', animals[i]); // added a data attribute
        a.text(animals[i]); // provide button text
        $("#animalsView").append(a); // appends the button to animal view
    };
};

// This calls the renderButtons() function to display animal buttons upon loading page
renderButtons();

// This function handles events when add animal button is clicked
$('#addAnimal').on('click', function(){
    var animal = $('#animal-input').val().trim(); // grabs the input from the textbox
    animals.push(animal); //the animal from the textbox is then added to our array
    renderButtons(); //array then runs which handles the processing of animal array
    return false; //prevents default
});

// This function handles events when an animal button is clicked
$('body').on('click', '.animal', function() {


    // stores the animal clicked in variable p, which is then passed into the queryURL
    var p = $(this).data('animal');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);

    // ajax method
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {

        // passes JSON object into variable results
        var results = response.data;

        // for loop to construct the animal objects as they appear on screen. This includes the picture rating and image
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $('<div class="item">')

            // Rating
            var rating = results[i].rating;
            var p = $('<p>').text("Rating: " + rating);

            // Image
            var animalImage = $('<img>');
            animalImage.attr('src', results[i].images.fixed_height_still.url);
            animalImage.attr('data-still', results[i].images.fixed_height_still.url);
            animalImage.attr('data-animate', results[i].images.fixed_height.url);
            animalImage.attr('data-state', "still");
            animalImage.attr('class', "clickAnimal");

            // Appends the rating and image to the gifDiv
            gifDiv.append(p)
            gifDiv.append(animalImage)

            // Prepends the gifDiv to the div with ID gifsAppearHere
            $('#gifsAppearHere').prepend(gifDiv);
        };
    });

    // Prevents default button activity
    return false;
});

// This function handles the click event that activates and deactivates gif animation
$('body').on('click', '.clickAnimal', function(){

    // the image attribute of state is stored into a variable state, which is then used to compare in the if/else statement below
    var state = $("img").attr("data-state");

    if (state === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});