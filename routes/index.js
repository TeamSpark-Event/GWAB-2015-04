var path = require('path');
var uuid = require('uuid');
var minify = require('html-minifier').minify;

var express = require('express');
var router = express.Router();

var dataStorage = require(path.join(__dirname, '../services/DataStorage'));

router.get('/', function(req, res) {
  res.render('index', {
    partials: getPartials(),
    isShowRegistrationForm: true
  }, function(err, html) {
    res.send(getMinifiedHtml(html));
  });
});

router.post('/', function(req, res) {
    res.render('index', {
        partials: getPartials(),
        isShowRegistrationForm: true
    }, function(err, html) {
        res.send(getMinifiedHtml(html));
    });

  //function isEmpty(val) {
  //    return typeof(val) === 'undefined'
  //        || val === null
  //        || val.length === 0;
  //}
  //
  //var firstName = req.body.tbFirstName;
  //var lastName = req.body.tbLastName;
  //var email = req.body.tbEmail;
  //
  //if (isEmpty(firstName) || isEmpty(lastName) || isEmpty(email)) {
  //    res.render('index', {
  //        partials: getPartials(),
  //        isShowRegistrationForm: true,
  //        errorMessage: 'Все поля обязательны для заполнения.',
  //        firstName: firstName,
  //        lastName: lastName,
  //        email: email
  //    }, function(err, html) {
  //        res.send(getMinifiedHtml(html));
  //    });
  //
  //  return;
  //}
  //
  //var entity = {
  //    PartitionKey: { '_' : '2015' },
  //    RowKey: { '_' : email },
  //    FirstName: { '_' : firstName },
  //    LastName: { '_' : lastName }
  //};
  //
  //dataStorage.insertEntity('GWABRegistration', entity).then(function(result){
  //    if (result.isError) {
  //        var errorMessage = result.errorMessage || 'Простите, произошла ошибка. Пожалуйста, попробуйте пройти регистрацию повторно.';
  //
  //        res.render('index', {
  //            partials: getPartials(),
  //            isShowRegistrationForm: true,
  //            errorMessage: errorMessage
  //        }, function(err, html) {
  //            res.send(getMinifiedHtml(html));
  //        });
  //
  //        return;
  //    }
  //    var entityFeedback = {
  //        PartitionKey: { '_' : '2015' },
  //        RowKey: { '_' : uuid.v4() },
  //        EMail: { '_' : email },
  //        FirstName: { '_' : firstName },
  //        LastName: { '_' : lastName }
  //    };
  //
  //    dataStorage.insertEntity('GWABFeedback', entityFeedback).then(function(){
  //        res.render('index', {
  //            partials: getPartials(),
  //            isShowRegistrationForm: false
  //        }, function(err, html) {
  //            res.send(getMinifiedHtml(html));
  //        });
  //    });
  //});
});

function getPartials() {
    return {
        about: 'partials/about',
        location: 'partials/location',
        partners: 'partials/partners',
        registration: 'partials/registration'
    };
}

function getMinifiedHtml(html){
    return minify(html, {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
    });
}

module.exports = router;
