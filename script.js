$(document).ready(function() {

  //Check that navigator authorizes geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      //extract latitude and longitude coordinates
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      //paste lat and long coordinates into google maps api to obtain jsonFile URL
      var jsonFile = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&location_type=ROOFTOP&result_type=street_address&key=AIzaSyBL6JY4Tu3mWbE_N2dTJicNNskDSuIUkQs";
      //paste lat and long coordinates into OpenWeatherMap api to obtain jsonWeather URL
      var jsonWeather = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=metric&appid=3baf05c6d9ba9dcbbf7c2616c7253aa5";

      //extract jsonFile
      $.getJSON(jsonFile, function(json) {

        //extract country name from file
        var jsonCountry = json.results[0].address_components[4].short_name;
        //extract locality name from file
        var jsonLocality = json.results[0].address_components[3].long_name;

        //Check that status of reverse geocoding is OK
        if (json.status === "OK") {
          //If status is OK, return locality and country
          $("#locationUser").html(jsonLocality + ", " + jsonCountry);
        }
        //If status is not OK, return error message
        else {
          $("#locationUser").html("#ERROR - Your location cannot be found");
        };

      });

      //extract jsonWeather file
      $.getJSON(jsonWeather, function(json2) {
        //extract temperature in Celsius from file 
        var json2TempC = json2.main.temp;
        //convert temperature to Fahrenheit
        var json2TempF = json2TempC * 9 / 5 + 32;
        //extract description of weather from file
        var json2Des = json2.weather[0].description;
        
        //Capitalize firt letters in weather description
        //create array with words in description
        var words = json2Des.split(" ");
        //loop on each word 
        for (var j = 0; j < words.length; j++) {
          //create array containing letters in word
          var letters = words[j].split("");
          //turn first letter of word into uppercase
          letters[0] = letters[0].toUpperCase();
          //reassemble word
          words[j] = letters.join("");
        };

        //extract icon code and apply to URL
        var jsonIcon = "http://openweathermap.org/img/w/" + json2.weather[0].icon + ".png";
        //return description in html
        $("#description").html(words.join(" "));
        //return icon in html
        $("#icon").html("<img class='clouds' src=" + jsonIcon + ">");
        //return temperature in html
        $("#temperature").html(json2TempC.toFixed(1) + " °C");

        // change background image according to weather
        var json2Id = json2.weather[0].id;
        //CLEAR
        if (json2Id === 800) {
          $("body").css("background-image", "url(http://static.flickr.com/45/152334599_6ee192a4d1_o.jpg)")
        }
        //THUNDERSTORM
        else if (json2Id >=200 && json2Id <= 232) {
          $("body").css("background-image", "url(http://www.ukweatherforecast.co.uk/wp-content/uploads/2014/05/Thunder.jpg)")
        }
        //DRIZZLE
        else if (json2Id >=300 && json2Id <= 321) {
          $("body").css("background-image", "url(http://www.chachacharming.com/wp-content/uploads/2013/05/rain-640x425.jpg)")
        }
        //RAIN
        else if (json2Id >=500 && json2Id <= 531) {
          $("body").css("background-image", "url(http://efdreams.com/data_images/dreams/rain/rain-02.jpg)")
        }
        //SNOW
        else if (json2Id >=600 && json2Id <= 622) {
          $("body").css("background-image", "url(https://media.giphy.com/media/Yy26NRbpB9lDi/giphy.gif)")
        }
        //ATMOSPHERE
        else if (json2Id >=701 && json2Id <= 781) {
          $("body").css("background-image", "url(https://webdesignledger.com/wp-content/uploads/2011/05/55-foggy-morning-street.jpg)")
        }
        //CLOUDS
        else if (json2Id >=801 && json2Id <= 804) {
          $("body").css("background-image", "url(https://c2.staticflickr.com/6/5538/30637825260_8ee1280d65_b.jpg)")
        };

        //add button to convert to Fahrenheit
        $(".btn").html("Convert to Fahrenheit");

        //Create counter
        var i = 0;
        //Function when clicking button
        $(".btn").on("click", function() {
          //+1 on counter
          i++;
          //if counter is even number then convert to Celsius and change button text
          if (i % 2 === 0) {
            $("#temperature").html(json2TempC.toFixed(1) + " °C");
            $(".btn").html("Convert to Fahrenheit");
          }
          //Else convert to Fahrenheit and change button text
          else {
            $("#temperature").html(json2TempF.toFixed(1) + " °F");
            $(".btn").html("Convert to Celsius");
          }
        });

      });
    });
  };
});


// Thunderstorm: 200-232 (https://media.giphy.com/media/rvdUftzA8567u/giphy.gif)
// Drizzle: 300-321 (https://media.giphy.com/media/xTcnT8PuKl5GBz26mk/giphy.gif)
// Rain: 500-531 (http://wallpaper-gallery.net/images/rain-image/rain-image-16.gif)
// Snow: 600-622 (https://media.giphy.com/media/Yy26NRbpB9lDi/giphy.gif)
// Atmosphere: 701-781 (https://static1.squarespace.com/static/5569b927e4b03fe792a4b2f4/t/557d7627e4b09e55f7455cab/1434285613658/part-the-mists-of-time.gif?format=1500w)
// Clear: 800 (https://secure.static.tumblr.com/fb31ec58574d49e6ee519c5382fab3ce/xfsdsxj/zdTnx87ca/tumblr_static_filename_640_v2.gif)
// Clouds: 801-804 (https://media.giphy.com/media/qq5gwamAHVofm/giphy.gif)