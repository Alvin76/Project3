var http = require('http');
var path = require('path');
const express = require("express");
const router = express.Router();
const axios = require("axios");
var bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
console.log("Starting server on port 3000")
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ encoded: false}));
app.use(express.static("public"));



app.get('/', function(req, res){
    res.render('index');
});

app.get('/todayscomic',function(req,res){
  var url = "https://xkcd.com/info.0.json";
  var comic;
  var title;
  var year;
  axios.get(url).then(function(response){
    console.log(response.data.img);
    comic = response.data.img;
    console.log(response.data.title);
    title = response.data.title;
    console.log(response.data.year);
    year = response.data.year;
    res.render('todayscomic', {
      comic: comic,
      title: title,
      year: year
  })
  });
});

app.post('/newRandom', function(req, res){
  var randomInt = getRndInteger();
  var url = 'https://xkcd.com/' + randomInt + '/info.0.json';
  console.log(url);
  var comic;
  var title;
  var year;
  axios.get(url).then(function(response){
    console.log(response.data.img);
    comic = response.data.img;
    console.log(response.data.title);
    title = response.data.title;
    console.log(response.data.year);
    year = response.data.year;
    res.render('randomcomic', {
      comic: comic,
      title: title,
      year: year
  })
  });
});

app.get('/randomcomic',function(req,res){
  var randomInt = getRndInteger();
  var url = 'https://xkcd.com/' + randomInt + '/info.0.json';
  console.log(url);
  var comic;
  var title;
  var year;
  axios.get(url).then(function(response){
    console.log(response.data.img);
    comic = response.data.img;
    console.log(response.data.title);
    title = response.data.title;
    console.log(response.data.year);
    year = response.data.year;
    res.render('randomcomic', {
      comic: comic,
      title: title,
      year: year
  })
  });
});

http.createServer(app).listen(port, function(){});

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (2100) );
}
