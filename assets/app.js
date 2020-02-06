var searchedCities = [];


$(document).ready(function(){

// if localstorage.cityHistory exists split the string in the key cityHistory and set to the value of searchedCities
if(localStorage.cityHistory){
  searchedCities = localStorage.cityHistory.split(",")
  console.log(searchedCities)
}

// grab div to populate searchedCity buttons
let div = document.getElementById("searched")


// now taking the local time and display with current weather
 const now = moment().format(' (l)');

//  taking the local time and adding x number of days
 const forecast1 = moment().add(1, 'days').format(' (l)');
 const forecast2 = moment().add(2, 'days').format(' (l)');
 const forecast3 = moment().add(3, 'days').format(' (l)');
 const forecast4 = moment().add(4, 'days').format(' (l)');
 const forecast5 = moment().add(5, 'days').format(' (l)');


 // for each item create a button, set button inner value to searchedCity[i], append button to searchedCitiesbutton div
 for(let i = 0; i < searchedCities.length; i++){
  let btn = document.createElement("button")
   btn.innerHTML = searchedCities[i]
   div.append(btn)
 }

// when the find city button is clicked 
$("#find-city").on("click", function(event) {

  event.preventDefault();


  // grab value typed into the city input and save to variable
  var city = $("#city-input").val();


  // creating a button for the most recently searched city and appends to the searchedCitiesbutton div
  let btn2 = document.createElement("button")
  btn2.innerHTML = city
  div.append(btn2)
  
  // add this element to the searched cities array
  searchedCities.push(city)
  localStorage.setItem("cityHistory", searchedCities )
  var historyButton = document.createElement("button")

  var queryURLcurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=85bf2b796bdb140ca54de0c2a152a712" 

    $.ajax({
        url: queryURLcurrent,
        method: "GET"
      }).then(function(response) {
        console.log(queryURLcurrent);
        console.log(response);
        
        // $("#img").text(response.weather[0].icon);
        $("#city").html("<h2>" + response.name + now + "</h2>");
        $("#temp").text("Temperature: " + response.main.temp + " °F");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");


        var lat = response.coord.lat
        var lon = response.coord.lon

        var queryURLuvIndex =  "https://api.openweathermap.org/data/2.5/uvi?appid=85bf2b796bdb140ca54de0c2a152a712&lat=" + lat + "&lon=" + lon 

        $.ajax({
          url: queryURLuvIndex,
          method: "GET"
         }).then(function(response) {
           console.log(queryURLuvIndex);
           console.log(response);
        
           $("#uv").text("UV Index: " + response.value);
      });

        var queryURL5day = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=85bf2b796bdb140ca54de0c2a152a712"

        $.ajax({
         url: queryURL5day,
         method: "GET"
        }).then(function(response) {
          console.log(queryURL5day);
          console.log(response);

          $("#dateDay1").text(forecast1);
          $("#tempDay1").text("Temperature: " + response.list[0].main.temp + " °F");
          $("#humidityDay1").text("Humidity: " + response.list[0].main.humidity + "%");
          
          $("#dateDay2").text(forecast2);
          $("#tempDay2").text("Temperature: " + response.list[7].main.temp + " °F");
          $("#humidityDay2").text("Humidity: " + response.list[7].main.humidity + "%");
          
          $("#dateDay3").text(forecast3);
          $("#tempDay3").text("Temperature: " + response.list[15].main.temp + " °F");
          $("#humidityDay3").text("Humidity: " + response.list[15].main.humidity + "%");
          
          $("#dateDay4").text(forecast4);
          $("#tempDay4").text("Temperature: " + response.list[23].main.temp + " °F");
          $("#humidityDay4").text("Humidity: " + response.list[23].main.humidity + "%");
          
          $("#dateDay5").text(forecast5);
          $("#tempDay5").text("Temperature: " + response.list[31].main.temp + " °F");
          $("#humidityDay5").text("Humidity: " + response.list[31].main.humidity + "%");
          
          // localStorage.setItem("#city-input", cityHistory);

      });

 
    })
  });
})


