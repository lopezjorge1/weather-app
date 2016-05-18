$(document).ready(function () {
  var lat;
  var lon; 
  var url = 'http://api.openweathermap.org/data/2.5/weather?lat=';
  var iconUrl = 'http://openweathermap.org/img/w/';
  var currentWeatherF;
  var currentWeatherC;
  var currentCity;
  var currentState;
  var humidity;
  var description;
  var weatherIcon;
  
  //Get data about location from json file
  $.getJSON('http://ip-api.com/json', function(ipAPI) {
    lat = ipAPI.lat;
    lon = ipAPI.lon;
    currentCity = ipAPI.city;
    currentState = ipAPI.region;
    //Modify current-location element to be the current city and state
    $("#location").html(" " + currentCity + ", " + currentState);
    
    //Get data about weather based off of the location 
    $.getJSON(url + lat + '&lon=' + lon + '&APPID=388e8da67f1b20f55ebdad2d8d6aba5d&units=imperial', function(json) {
      currentWeatherF = json.main.temp;
      currentWeatherC = ((currentWeatherF - 32) * (5/9)).toFixed(2);
      humidity = json.main.humidity;
      description = json.weather[0].description;
      weatherIcon = json.weather[0].icon;
      
      //&#x2103 for Celsius
      $("#temperature").html(" " + currentWeatherF);
      $("#type").html(" " + "&#x2109;");
      $("#humidity").html(" " + humidity + "%");

      $("#weather-icon").attr("src", iconUrl + weatherIcon + ".png");
      $("#description-info").html(description);
    
      //When temperature is clicked it will toggle between F and C
      $("#temperature").click(function () {
        if ($("#temperature").text() === " " + currentWeatherF) {
          $("#temperature").html(" " + currentWeatherC);
          $("#type").html(" " + "&#x2103;");
        } else {
          $("#temperature").html(" " + currentWeatherF);
          $("#type").html(" " + "&#x2109;");
        }
      });
      
      //Conditional determines what picture is shown based on temperature
      if (currentWeatherF > 80) {
        $("body").css("background-image","url(burning.jpg)");
        $("html,body").css("color","#fff");
      } else if (currentWeatherF > 70) {
        $("body").css("background-image","url(beach.jpg)");
        $("#description").css("color","#000");
      } else if (currentWeatherF > 60) {
        $("body").css("background-image","url(relax.jpg)");
      } else if (currentWeatherF > 50) {
        $("body").css("background-image","url(sweater.jpg)");
      } else if (currentWeatherF > 40) {
        $("body").css("background-image","url(frosty.jpg)");
      } else {
        //current description needs to be another color
        $("body").css("background-image","url(brick.jpg)");
        $("#description").css("color","#000");
      }
    });
    
  });
  
  //When current description is clicked description box will show
  $("#description").click(function (e) {
    e.stopPropagation();
    $("#description-box").removeAttr("hidden");
  });
  //When anything else is clicked th description box will be hidden
  $(document).click(function() {
    $("#description-box").attr("hidden",true);
  });
});