// Initial array of animals
var animals = ['Cat', 'Dog', 'Lemur', 'Buffalo'];

// Generic function for displaying animal buttons 
function renderButtons(){ 

    $("#animalsView").empty(); //empties animals view

    for (var i = 0; i < animals.length; i++) {

        var a = $('<button>'); // creates blank button

        a.addClass('animal'); // add a class
        a.attr('data-animal', animals[i]); // added a data attribute
        a.text(animals[i]); // provide button text
        $("#animalsView").append(a); // appends the button to animal view
    }       

}

// ========================================================

// This function handles events where one button is clicked
$('#addAnimal').on('click', function(){

    var animal = $('#animal-input').val().trim(); // grabs the input from the textbox

    animals.push(animal); //the animal from the textbox is then added to our array

    renderButtons(); //array then runs which handles the processing of animal array

    return false; //prevents default

})

// ========================================================

// This calls the renderButtons() function
renderButtons();

$('body').on('click', '.animal', function() {
    var p = $(this).data('animal');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        var results = response.data;
        console.log(response.data);

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $('<div class="item">')

            var rating = results[i].rating;

            var p = $('<p>').text("Rating: " + rating);

            var animalImage = $('<img>');
            animalImage.attr('src', results[i].images.fixed_height.url);

            gifDiv.append(p)
            gifDiv.append(animalImage)

            $('#gifsAppearHere').prepend(gifDiv);
        };
    });

    return false;
});