var apiCalls = require('../../shared/api_calls');
var History = require('../../shared/history');
var doesUserIDExist = require('../../shared/user_id_exists');
var findSafestRoute = require('../../shared/find_safest_route');
var saveRoutePaths = require('../../shared/save_route_paths');
var saveRoute = require('../../../database/database').insert.routes;
var createRouteID = require('../../../random_generator/unique_id_generator').generateRouteID;
var getStartTimeDateTime = require('../../shared/create_date_time');

module.exports = function(request, response){
  var userID = request.userID;
  doesUserIDExist(userID, function(exists){
    if(exists){
      var startTime = getStartTimeDateTime(request.startTime);
      findSafestRoute(request.start, request.end, startTime, function(err, route, choosenStartTime){
        if(err == null){
          createRouteID(function(routeID){
            saveRoutePaths(route, routeID, function(err){
              if(err == null){
                saveRoute(route, routeID, userID, choosenStartTime, function(err){
                  var intent = 'RouteID: ' + routeID + ' Start: ' + request.start + ' End: ' + request.end;
                  responseToSender(err, route, routeID, response, userID, intent);
                });
              }
              else{
                var intent = 'Start: ' + request.start + ' End: ' + request.end + 'System Error';
                responseToSender(err, null, null, response, userID, intent);
              }
            });
          });
        }
        else{
          var intent = 'System Error';
          responseToSender(err, null, null, response, userID, intent);
        }
      });
    }
    else{
      var intent = 'UserID does not exist';
      responseToSender(err, null, null, response, userID, intent);
    }
  });
}

var responseToSender = function(err, routeChoosen, routeID, response, userID, intent){
  var type = apiCalls.postRoadTripString;
  var history = new History(userID, type, intent);
  if(err != null || routeID == null || routeChoosen == null){
    response.func(true, null, history, response.res);
  }
  else{
    response.func(null, {success : 1, routeID: routeID, route : routeChoosen}, history, response.res);
  }
}
