var path = require('path');
var uuid = require('uuid');
var minify = require('html-minifier').minify;

var express = require('express');
var router = express.Router();

var dataStorage = require(path.join(__dirname, '../services/DataStorage'));

router.get('/', function(req, res) {
  res.render('index', {
    partials: getPartials()
  });
});

router.post('/', function(req, res) {
  res.render('index', {
    partials: getPartials()
  });
});

function getPartials() {
  return {
    about: 'partials/about',
    location: 'partials/location',
    partners: 'partials/partners',
    registration: 'partials/registration'
  };
}

module.exports = router;
