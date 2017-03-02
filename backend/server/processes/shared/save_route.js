var saveRoute = require('../../database/database').insert.routes;
var savePath = require('../../database/database').insert.paths;
var saveLocation = require('../../database/database').insert.locations;
var async = require('async');

module.exports = function(route, userID, routeID, startTime, callback){
  insertPaths(route, routeID, function(err){
    if(err == null){
      saveRoute(route, routeID, userID, startTime, function(err){
        callback(err);
      });
    }
    else{
      callback(err, null);
    }
  });
}

var insertPaths = function(route, routeID, callback){
  var paths = route.paths;
  var numPaths = paths.length;
  var index = 0;
  async.whilst(
    function () { return index < numPaths; },
    function (callback) {
      var path = paths[index];
      insertStartAndEndLocations(path, function(err, startID, endID){
        if(err == null){
          savePath(path, routeID, startID, endID, function(err, pathID){
            if(err == null){
              index++;
              callback();
            }
            else{
              callback(err);
            }
          });
        }
        else{
          callback(err);
        }
      });
    },
    function (err) {
      callback(err);
    }
  );
}

var insertStartAndEndLocations = function(path, callback){
  saveLocation(path.start, function(err, startID){
    if(err == null){
      saveLocation(path.end, function(err, endID){
        if(err == null){
          callback(null, startID, endID);
        }
        else{
          callback(err, null, null);
        }
      });
    }
    else{
      callback(err, null, null);
    }
  });
}
