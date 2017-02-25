var express = require('express');
var router = express.Router();

var verifyRoadTrip = require('../security/data_validation/road_trip');
var processRoadTrip = require('../processes/road_trip/processor');
var handleRequest = require('./data_handler');

router.post('/', function(req, res){
  handleRequest(req, res, verifyRoadTrip, processRoadTrip);
});

module.exports = router;
