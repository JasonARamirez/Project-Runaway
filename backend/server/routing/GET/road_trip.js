var express = require('express');
var router = express.Router();

var verifyRoadTrip = require('../../security/data_validation/GET/road_trip');
var processRoadTrip = require('../../processes/GET/road_trip/processor');
var handleRequest = require('../data_handler');

router.get('/', function(req, res){
  handleRequest(req, res, verifyRoadTrip, processRoadTrip);
});

module.exports = router;
