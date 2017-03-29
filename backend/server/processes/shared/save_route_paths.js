var savePath = require('../../database/database').insert.paths;
var saveLocation = require('../../database/database').insert.locations;
var async = require('async');

module.exports = function(route, routeID, callback){
  var paths = route.paths;
  var asyncTasks = createTasks(paths, routeID);
  async.parallel(asyncTasks, function(err){
    callback(err);
  });
}

var createTasks = function(paths, routeID){
  var tasks = [];
  paths.forEach(function(path){
    tasks.push(insertPath(path, routeID));
  });
  return tasks;
}

var insertPath = function(path, routeID){
  var toInsert = function(callback){
    insertStartAndEndLocations(path, function(err, startID, endID){
      if(err == null){
        savePath(path, routeID, startID, endID, function(err, pathID){
            callback(err);
        });
      }
      else{
        callback(err);
      }
    });
  }
  return toInsert;
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
