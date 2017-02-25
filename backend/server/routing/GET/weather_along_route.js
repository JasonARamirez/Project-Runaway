var express = require('express');
var router = express.Router();

var verifyWeatherAlongRoute = require('../security/data_validation/GET/weather_along_route');
var processWeatherAlongRoute = require('../processes/GET/weather_along_route/processor');
var handleRequest = require('../data_handler');

router.get('/', function(req, res){
  handleRequest(req, res, verifyWeatherAlongRoute, processWeatherAlongRoute);
});

module.exports = router;
