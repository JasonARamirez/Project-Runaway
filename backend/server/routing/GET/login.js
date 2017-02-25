var express = require('express');
var router = express.Router();

var verifyLogin = require('../security/data_validation/GET/login');
var processLogin = require('../processes/GET/login/processor');
var handleRequest = require('../data_handler');

router.get('/', function(req, res){
  handleRequest(req, res, verifyLogin, processLogin);
});

module.exports = router;
