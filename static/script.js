$(document).ready(function () {
  $("#search-input").on("input", function () {
    var query = $(this).val();

    if (query.length > 0) {
      fetchSuggestions(query);
    } else {
      $("#suggestions").empty();
    }
  });
});

function fetchSuggestions(query) {
  $.ajax({
    url: "/suggestions",
    type: "POST",
    data: { query: query },
    success: function (response) {
      displaySuggestions(response);
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
}

function displaySuggestions(suggestions) {
  var suggestionsContainer = $("#suggestions");
  suggestionsContainer.empty();

  if (suggestions.length > 0) {
    var suggestionList = $("<ul>");
    for (var i = 0; i < suggestions.length; i++) {
      var suggestion = $("<li>").text(suggestions[i]);
      suggestionList.append(suggestion);
    }
    suggestionsContainer.append(suggestionList);
  }
}

/// Function to update the clock and display greeting
function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var greeting;

  if (hours >= 5 && hours < 12) {
    greeting = "Good Morning";
  } else if (hours >= 12 && hours < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var timeString =
    hours.toString().padStart(2, "0") +
    ":" +
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0");

  $(".clock").text(greeting + ", the time is: " + timeString);
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial clock update
updateClock();

// Function to navigate to AI search page
function navigateToAISearch() {
  window.location.href = "https://chat.openai.com/";
}
