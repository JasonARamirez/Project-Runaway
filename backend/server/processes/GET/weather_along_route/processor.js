var doesRouteIDExist = require('../../shared/route_id_exists');
var getLocationsAlongRoute = require('./get_locations_along_route');
var getWeatherDetails = require('./get_weather_details');
module.exports = function(request, response){
  var routeID = request.routeID;
  var userID = request.userID;
  doesRouteIDExist(routeID, userID, function(exists){
    if(exists){
      getLocationsAlongRoute(routeID, function(err, routeDetails, startTime){
        if(err == null){
          var isBasedOnTime = request.timeOrDistance == 0;
          var interval = request.interval;
          var timesToCheck = getIntervals(isBasedOnTime, interval, routeDetails.time, routeDetails.distance);
          getWeatherDetails(routeDetails.locations, startTime, timesToCheck.numToCheck, timesToCheck.interval, function(err, weatherCards){
            responseToSender(err, weatherCards, response);
          });
        }
        else{
          responseToSender(true, null, response);
        }
      });
    }
    else{
      responseToSender(true, null, response);
    }
  });
}

var responseToSender = function(err, weatherCards, response){
  if(err != null || weatherCards == null){
    response.func(true, null, response.res);
  }
  else{
    response.func(null, {success : 1, weatherCards: weatherCards}, response.res);
  }
}

var getIntervals = function(isBasedOnTime, interval, totalTime, totalDistance){
  var timeInMinutes = totalTime / 60;
  if(isBasedOnTime){
    var numLocationsToCheck = Math.floor(timeInMinutes / interval);
    return {interval : interval, numToCheck : numLocationsToCheck};
  }
  else{
    var numLocationsToCheck = Math.floor(totalDistance / interval);
    var timeInterval = Math.floor(totalTime / numLocationsToCheck);
    return {interval : timeInterval, numToCheck : numLocationsToCheck};
  }
}
