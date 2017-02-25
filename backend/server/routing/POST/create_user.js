var express = require('express');
var router = express.Router();

var verifyCreateUser = require('../security/data_validation/POST/create_user');
var processCreateUser = require('../processes/POST/create_user/processor');
var handleRequest = require('../data_handler');

router.post('/', function(req, res){
  handleRequest(req, res, verifyCreateUser, processCreateUser);
});

module.exports = router;
