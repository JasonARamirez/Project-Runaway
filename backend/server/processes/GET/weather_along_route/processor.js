var apiCalls = require('../../shared/api_calls');
var History = require('../../shared/history');
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
            var intent = 'RouteID: ' + routeID;
            responseToSender(err, weatherCards, response, userID, intent);
          });
        }
        else{
          var intent = 'RouteID: ' + routeID + ' System Error';
          responseToSender(true, null, response, userID, intent);
        }
      });
    }
    else{
      var intent = 'RouteID: ' + routeID + ' does not exist';
      responseToSender(true, null, response, userID, intent);
    }
  });
}

var responseToSender = function(err, weatherCards, response, userID, intent){
  var type = apiCalls.getWeatherAlongRouteString;
  var history = new History(userID, type, intent);
  if(err != null || weatherCards == null){
    response.func(true, null, history, response.res);
  }
  else{
    response.func(null, {success : 1, weatherCards: weatherCards}, history, response.res);
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
