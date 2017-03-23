var express = require('express');
var router = express.Router();
var folderHTML = __dirname + '/html/';

router.get('/', function(req, res){
  res.sendFile(folderHTML + 'index.html');
});

router.get('/main.css', function(req, res){
  res.sendFile(__dirname + '/css/main.css');
});

module.exports = router;
