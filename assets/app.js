$(document).ready(function(){

 const now = moment().format(' (l)');

$("#find-city").on("click", function(event) {

  event.preventDefault();

  var city = $("#city-input").val();

  var queryURLcurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=85bf2b796bdb140ca54de0c2a152a712" 

    $.ajax({
        url: queryURLcurrent,
        method: "GET"
      }).then(function(response) {
        console.log(queryURLcurrent);
        console.log(response);
        
        $("#city").html("<h2>" + response.name + now + "</h2>");
        $("#temp").text("Temperature: " + response.main.temp + " °F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");

        var lat = response.coord.lat
        console.log(response.coord.lat)
        var lon = response.coord.lon

        var queryURLuvIndex =  "http://api.openweathermap.org/data/2.5/uvi?appid=85bf2b796bdb140ca54de0c2a152a712&lat=" + lat + "&lon=" + lon 

        $.ajax({
          url: queryURLuvIndex,
          method: "GET"
         }).then(function(response) {
           console.log(queryURLuvIndex);
           console.log(response);
        
           $("#uv").text("UV Index: " + response.value);
      });
        
     });

 

  });
})
