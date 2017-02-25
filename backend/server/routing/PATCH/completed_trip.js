var express = require('express');
var router = express.Router();

var verifyCompletedTrip = require('../security/data_validation/PATCH/completed_trip');
var processCompletedTrip = require('../processes/PATCH/completed_trip/processor');
var handleRequest = require('../data_handler');

router.patch('/', function(req, res){
  handleRequest(req, res, verifyCompletedTrip, processCompletedTrip);
});

module.exports = router;
