var getRoutePath = require('../../../database/database').retrieve.routes.getRoutePaths;
module.exports = function(routeID, callback){
  getRoutePath(routeID, function(err, paths, startTime){
    if(err == null){
      paths.sort(comparePaths);
      callback(null, getTimeAndDetails(paths), startTime);
    }
    else{
      callback(err);
    }
  });
}

function RoutesDetails(locations, time, distance){
  this.locations = locations;
  this.time = time;
  this.distance = distance;
}

var getTimeAndDetails = function(paths){
  var locations = [];
  var totalTime = 0;
  var totalDistance = 0;

  paths.forEach(function(path){
    var start = path.relations.start.attributes;
    var attributes = path.attributes;
    var lat = start.lat;
    var lng = start.lng;
    locations.push([lat, lng]);
    totalTime += attributes.time;
    totalDistance += attributes.distance;
  });

  var lastPath = paths[paths.length - 1];
  var end = lastPath.relations.start.attributes;
  locations.push([end.lat, end.lng]);

  return new RoutesDetails(locations, totalTime, totalDistance);
}

var comparePaths = function(a, b){
  var aPosition = a.attributes.pos;
  var bPosition = b.attributes.pos;
  return aPosition - bPosition;
}
