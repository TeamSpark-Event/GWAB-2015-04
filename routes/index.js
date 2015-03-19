var express = require('express');
var router = express.Router();

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
