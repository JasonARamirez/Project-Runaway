var Route = require('../../models/routes');
var Routes = require('../../collections/routes');
var saveLocation = require('./locations');

module.exports = function(route, routeID, userID, startTime, callback){
  getStartAndEndLocID(route, function(err, startID, endID){
    if(err == null){
      new Route(new routeToInsert(routeID, userID, startTime, startID, endID)).save().then(function(newRoute){
        Routes.add(newRoute);
        callback(null);
      });
    }
    else{
      callback(err);
    }
  });
}

function routeToInsert(routeID, userID, startTime, startID, endID){
  this.ID = routeID;
  this.userID = userID;
  this.startTime = startTime;
  this.startID = startID;
  this.endID = endID;
  this.done = false;
  this.canceled = false;
}

var getStartAndEndLocID = function(route, callback){
  var start = route.start;
  var end = route.end;
  saveLocation(start, function(err, startID){
    if(startID != null){
      saveLocation(end, function(err, endID){
        if(endID != null){
          callback(null, startID, endID);
        }
        else{
          callback(true, null, null);
        }
      });
    }
    else{
      callback(true, null, null);
    }
  });
}
