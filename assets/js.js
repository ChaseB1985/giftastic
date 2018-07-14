$(document).ready(function () {
    var animals = ["cat", "dog", "hamster", "lion", "sea lion", "goat", "bird"];
    // Function for displaying movie data
  
  
    function renderButtons() {
  
      // Deleting the movie buttons prior to adding new movie buttons
      // (this is necessary otherwise we will have repeat buttons)
      $("#animals").empty();
      // Looping through the array of movies
      for (var i = 0; i < animals.length; i++) {
        // Then dynamicaly generating buttons for each movie in the array.
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("animal-button");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", animals[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(animals[i]);
        // Adding the button to the HTML
        $("#animals").append(a);
      }
    }
  
    // Calling the renderButtons function at least once to display the initial list of movies
    renderButtons();
  
    // Event listener for our button
    $("#animals").on("click", ".animal-button", function () {
  
      event.preventDefault();
  
      console.log("animal button got clicked");
  
      $("#animal-gifs").empty();
      //$(".animal-button").removeClass("active");
      //$(this).addAniClass("active");
      var name = $(this).attr("data-name");
      console.log(name);
  
      // Storing our giphy API URL for a random cat image
      // USE GIPHY'S SEARCH API TO GET A LIST OF GIFS
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + name + "&limit=10";
  
      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After the data from the AJAX request comes back
        .then(function (response) {
          console.log(response);
  
          // LOOP THROUGH ALL THE DATA RESPONSES RECEIVED FROM AJAX CALL
          for (var x = 0; x < response.data.length; x++) {
            console.log("start loop iteration #" + x);
  
            // CREATE A NEW DIV WITH CLASS ATTRIBUTE
            var newDiv = $("<div>").attr("class", "animal-div");
  
            // Saving the image_original_url property
            var imageUrl = response.data[x].images.fixed_height_still.url;
  
            // Creating and storing an image tag
            var aniImage = $("<img>");
            var animate = response.data[x].images.fixed_height.url;
            var still = response.data[x].images.fixed_height_still.url;
            // Setting the catImage src attribute to imageUrl
            aniImage.attr("src", imageUrl);
            aniImage.attr("alt", name +" image");
            aniImage.attr("data-animate", animate);
            aniImage.attr("data-still", still);
            aniImage.attr("data-state", "still");
            aniImage.addClass("aniImage");
  
            // APPEND ANIMAL IMAGE TO THE NEW DIV
            newDiv.append(aniImage);
  
            // Prepending the catImage to the images div
            // APPEND NEW DIV CONTAINING ANIMAL IMAGE
            $("#animals").prepend(newDiv);
  
          }
        });
  
  
      $(".animal-div").on("click", ".aniImage", function () {
        console.log("animal img to clicked");
  
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        };
      });
  
      // This function handles events where one button is clicked
      $("#add-animal").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
        // This line will grab the text from the input box
        var animal = $("#animal-input").val().trim();
        // The movie from the textbox is then added to our array
        animals.push(animal);
        // calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
  
    });
  
  });