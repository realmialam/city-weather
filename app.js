
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));



// get request on route.
app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res)
{
  const query = req.body.cityName;
  const apiKey = "7390507ceed1a284d988ed7181558ec6";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?" + "q="+query+"&units="+unit+"&appid="+apiKey;


  https.get(url, function(response){
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" +icon+ "@2x.png";

      res.write("<p>The weather is currently " + weatherDescription + "</p1>" );
      res.write("<h1>The temprature of " + query+" is " + temp + " Celsius.</h1>");
      res.write("<img src=" + imageURL +  ">");
      res.send();

    });
  });

});


// Setting listening port.
app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
