var city = $("#city").val();

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&appid=85bf2b796bdb140ca54de0c2a152a712" 



$(document).ready(function(){
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(queryURL);
        console.log(response);
        $("city").text(JSON.stringify(response));
        
      });
})
