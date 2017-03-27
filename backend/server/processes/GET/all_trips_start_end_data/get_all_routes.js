var getAllRoutes = require('../../../database/database').retrieve.routes.getAllRoutes;

module.exports = function(userID, callback){
    getAllRoutes(userID, function(err, routes){
      if(err == null){
        var formattedRoutes = formatRoutes(routes);
        formattedRoutes.sort(sortRoutesBasedOffStartLatLng);
        callback(null, formattedRoutes);
      }
      else{
        callback(err, null);
      }
    });
}

var formatRoutes = function(routes){
  var toReturn = [];
  routes.forEach(function(route){
    toReturn.push(new Route(route.attributes, route.relations));
  });
  return toReturn;
}

var sortRoutesBasedOffStartLatLng = function(a, b){
  var startA = a.start;
  var startB = b.start;

  var latDiff = startA[0] - startB[0];
  if(latDiff == 0){
    return startA[1] - startB[1];
  }
  return latDiff;
}

function Route(attributes, locations){
  this.routeID = attributes.ID;
  this.canceled = attributes.canceled;
  this.completed = attributes.done;
  this.startTime = attributes.startTime;
  this.start = getLatLng(locations.startLocation);
  this.end = getLatLng(locations.endLocation);
}

var getLatLng = function(location){
  var attributes = location.attributes;
  var latLng = [];
  latLng.push(attributes.lat);
  latLng.push(attributes.lng);
  return latLng;
}
