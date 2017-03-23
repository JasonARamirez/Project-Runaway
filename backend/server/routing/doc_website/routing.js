var express = require('express');
var router = express.Router();
var folderHTML = __dirname + '/html/';

router.get('/', function(req, res){
  res.sendFile(folderHTML + 'index.html');
});

router.get('/main.css', function(req, res){
  res.sendFile(__dirname + '/css/main.css');
});

router.get('/main.js', function(req, res){
  res.sendFile(__dirname + '/javascript/main.js');
});

router.get('/document.html', function(req, res){
  res.sendFile(folderHTML + 'document.html');
});

module.exports = router;
