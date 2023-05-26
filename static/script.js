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
