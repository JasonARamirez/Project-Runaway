var express = require('express');
var router = express.Router();

var verifyWeatherAtLocation = require('../../security/data_validation/GET/weather_at_location');
var processWeatherAtLocation = require('../../processes/GET/weather_at_location/processor');
var handleRequest = require('../data_handler');

router.get('/', function(req, res){
  handleRequest(req, res, verifyWeatherAtLocation, processWeatherAtLocation);
});

module.exports = router;
