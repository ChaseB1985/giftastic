    $(document).ready(function(){

    var animals = ["cat", "dog", "hamster", "lion", "sea lion", "goat", "bird"
        ];
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
    // Event listener for our button
    $(document).on("click", ".animal-button", function() {
        $("#animal-gifs").empty(); 
        //$(".animal-button").removeClass("active");
        //$(this).addAniClass("active");

        var name = $(this).attr("data-name");
        // Storing our giphy API URL for a random cat image
        var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="+ name;
  
        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
        })
  
        // After the data from the AJAX request comes back
        .then(function(response) {
        
  
          // Saving the image_original_url property
          var imageUrl = response.data.image_original_url;
  
          // Creating and storing an image tag
          var aniImage = $("<img>");
          var animate = results[i].image.fixed_height.url; 
          var still = results[i].image.height_still.url;  
          // Setting the catImage src attribute to imageUrl
          aniImage.attr("src", imageUrl);
          aniImage.attr("alt", "cat image");
          aniImage.attr("data-animate", animate);
          aniIamge.attr("data-still", "still");
  
          // Prepending the catImage to the images div
          $("#animals").prepend(aniImage);
        });





      // This function handles events where one button is clicked
      $("#add-animal").on("click", function(event) {
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

      // Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();
      });
   
        $(document).on("click", ".aniImage", function() {
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
        }
    });
    // ui portion


//3 static buttons

//search button 

//div area to store images



//backend

//create array to store the 3 static button and to store other dynamic buttons created

//api ajax request
//get axjax request for src still image and src animated image

//for each image add the attribute for src, still image url, animated image url, data-state="still" or "animate", class

//logically create if the user clicks on gif
//if data-state=still
//grab animate url and set state to animate
//else
//set data-state=animate and grab the still