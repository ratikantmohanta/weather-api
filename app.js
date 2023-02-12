const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

require('dotenv').config();

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res) => {

    // Use of bodyParser.
    const cityName = req.body.cityName;
    const apiKey = process.env.API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=metric";

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);

            //Entire Weather data
            console.log(weatherData);

            const temprature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imgUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

            console.log(temprature);
            console.log(weatherDescription);

            res.write("<center><h1>Temperaure in " + cityName + " is:" + temprature + "deg Celcius</h1>");
            res.write("<p>weather is currently: " + weatherDescription + "</p>");
            res.write("<img src='" + imgUrl + "'>");

            res.send();

            //--------------------------------------------------------------------------------//
            // My simple approach instead or res.write()
            // res.send("<center><h1>Temperaure in pune is:" + temprature + "deg Celcius</h1>"
            //     + "<br><h2>weather is currently: " + weatherDescription + "</h2></center>");

            //Converting object to string
            // const object = {
            //     name: "Ratikant",
            //     favouriteFood: "Paneer"
            // }
            //         // console.log(JSON.stringify(object));
            //     });
            // });


            //res.send("Server is up");

        });
    });

});

app.listen(3333, () => {
    console.log("server started at 3333");
});
