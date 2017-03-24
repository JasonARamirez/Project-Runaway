var express = require('express');
var router = express.Router();
var folderHTML = __dirname + '/html/';
var folderJS = __dirname + '/javascript/';

router.get('/', function(req, res){
  res.sendFile(folderHTML + 'index.html');
});

router.get('/main.css', function(req, res){
  res.sendFile(__dirname + '/css/main.css');
});

router.get('/index.js', function(req, res){
  res.sendFile(folderJS + 'index.js');
});

router.get('/document.html', function(req, res){
  res.sendFile(folderHTML + 'document.html');
});

router.get('/header.html', function(req, res){
  res.sendFile(folderHTML + 'header.html');
});

router.get('/sign_in.html', function(req, res){
  res.sendFile(folderHTML + 'sign_in.html');
});

router.get('/sign_in.js', function(req, res){
  res.sendFile(folderJS + 'sign_in.js');
});

router.get('/sign_up.html', function(req, res){
  res.sendFile(folderHTML + 'sign_up.html');
});

router.get('/sign_up.js', function(req, res){
  res.sendFile(folderJS + 'sign_up.js');
});

router.get('/md5.js', function(req, res){
  res.sendFile(folderJS + 'md5.js');
});

module.exports = router;
