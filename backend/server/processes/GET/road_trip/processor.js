var apiCalls = require('../../shared/api_calls');
var History = require('../../shared/history');
var doesRouteIDExist = require('../../shared/route_id_exists');
var deletePaths = require('../../shared/remove_paths');
var getRouteDetails = require('./get_route_details');
var findSafestRoute = require('../../shared/find_safest_route');
var saveRoutePaths = require('../../shared/save_route_paths');

module.exports = function(request, response){
  var routeID = request.routeID;
  var userID = request.userID;
  doesRouteIDExist(routeID, userID, function(exists){
    if(exists){
      deletePaths(routeID, function(err){
        if(err == null){
          getRouteDetails(routeID, function(err, route, start, end){
            if(err == null){
              var startLatLng = getLatLng(start);
              var endLatLng = getLatLng(end);
              var startTime = route.startTime;
              findSafestRoute(startLatLng, endLatLng, startTime, function(err, route, choosenStartTime){
                if(err == null){
                  saveRoutePaths(route, routeID, function(err){
                    var intent = 'RouteID: ' + routeID;
                    responseToSender(err, route, response, userID, intent);
                  });
                }
                else{
                  var intent = 'RouteID: ' + routeID + ' System Error';
                  responseToSender(true, null, response, userID, intent);
                }
              });
            }
            else{
              var intent = 'RouteID: ' + routeID + ' System Error';
              responseToSender(true, null, response, userID, intent);
            }
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

var responseToSender = function(err, routeChoosen, response, userID, intent){
  var type = apiCalls.getRoadTripString;
  var history = new History(userID, type, intent);
  if(err != null || routeChoosen == null){
    response.func(true, null, history, response.res);
  }
  else{
    response.func(null, {success : 1, route : routeChoosen}, history, response.res);
  }
}

var getLatLng = function(location){
  var attributes = location.attributes;
  var latLng = [];
  latLng.push(attributes.lat);
  latLng.push(attributes.lng);
  return latLng;
}
