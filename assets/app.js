$("city")

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=85bf2b796bdb140ca54de0c2a152a712" 

$(document).ready(function(){
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
          console.log(response);
        $("city").text(JSON.stringify(response));
      });
})
