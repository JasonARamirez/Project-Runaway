var express = require('express');
var router = express.Router();
var folderHTML = __dirname + '/html/';
var folderJS = __dirname + '/javascript/';

router.get('/', function(req, res){
  res.sendFile(folderHTML + 'index.html');
});

router.get('/app.js', function(req, res){
  res.sendFile(folderJS + 'app.js');
});

router.get('/home_view.html', function(req, res){
  res.sendFile(folderHTML + 'home_view.html');
});

router.get('/documentation_view.html', function(req, res){
  res.sendFile(folderHTML + 'documentation_view.html');
});

router.get('/map_view.html', function(req, res){
  res.sendFile(folderHTML + 'map_view.html');
});

router.get('/history_view.html', function(req, res){
  res.sendFile(folderHTML + 'history_view.html');
});

router.get('/history_controller.js', function(req, res){
  res.sendFile(folderJS + 'history_controller.js');
});

router.get('/map_controller.js', function(req, res){
  res.sendFile(folderJS + 'map_controller.js');
});

router.get('/google_maps.js', function(req, res){
  res.sendFile(folderJS + 'google_maps.js');
});

module.exports = router;
