var express = require('express');
var router = express.Router();

var verifyCancelTrip = require('../../security/data_validation/DELETE/cancel_trip');
var processCancelTrip = require('../../processes/DELETE/cancel_trip/processor');
var handleRequest = require('../data_handler');

router.delete('/', function(req, res){
  handleRequest(req, res, verifyCancelTrip, processCancelTrip);
});

module.exports = router;
