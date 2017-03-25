var express = require('express');
var router = express.Router();

var verifyAllTripsStartEndData = require('../../security/data_validation/GET/all_trips_start_end_data');
var processAllTripsStartEndData = require('../../processes/GET/all_trips_start_end_data/processor');
var handleRequest = require('../data_handler');

router.get('/', function(req, res){
  handleRequest(req, res, verifyAllTripsStartEndData, processAllTripsStartEndData);
});

module.exports = router;
