const express = require('express');
const app = express();
const data = require('./data/tracks');
const bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {
    tracks: data
  });
});

app.post('/search-by-surface', function (req, res) {

  var surface = req.body.surface
  var filteredData = data.filter(function(track){
    return track.surfaces.indexOf(surface) > -1
  });

  res.render('index', {
    tracks: filteredData
  });
});


app.post('/search-by-zip', function (req, res) {

  var zip = req.body.zip
  var filteredData = data.filter(function(track){
    return track.zip === zip
  });

  res.render('index', {
    tracks: filteredData,
    zip: zip
  });
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});