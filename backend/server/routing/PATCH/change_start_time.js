var express = require('express');
var router = express.Router();

var verifyChangeStart = require('../../security/data_validation/PATCH/change_start');
var processChangeStart = require('../../processes/PATCH/change_start/processor');
var handleRequest = require('../data_handler');

router.patch('/', function(req, res){
  handleRequest(req, res, verifyChangeStart, processChangeStart);
});

module.exports = router;
