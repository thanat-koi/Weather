const express = require('express')
const https = require('https')
const app = express()
const port = 3000
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});
app.post('/', (req, res) => {

    const query = req.body.cityName;
    const apiKey = "1fc2cb5a48bb8a0294c86c2949f536d0";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + apiKey + "&units=" + units;
    https.get(url, (response) => {
        console.log(response.statusCode)

        response.on('data',(data) => {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + weatherDescription+"</p>")
            res.write("<h1>the temparate in " + query + " is " + temp + " Degree Celcius</h1>");
            res.write("<img src='" + imgURL +"' />");
            res.send();
        })
    })
})
app.listen (port, () => console.log("this is port " + port));
