var express = require('express');
var router = express.Router();

var verifyAllAPIHistory = require('../../security/data_validation/GET/all_api_history');
var processAllAPIHistory = require('../../processes/GET/all_api_history/processor');
var handleRequest = require('../data_handler');

router.get('/', function(req, res){
  handleRequest(req, res, verifyAllAPIHistory, processAllAPIHistory);
});

module.exports = router;
