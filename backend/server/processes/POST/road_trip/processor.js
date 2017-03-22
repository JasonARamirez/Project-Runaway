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
                  responseToSender(err, route, routeID, response);
                });
              }
              else{
                responseToSender(err, null, null, response);
              }
            });
          });
        }
        else{
          responseToSender(err, null, null, response);
        }
      });
    }
    else{
      responseToSender(err, null, null, response);
    }
  });
}

var responseToSender = function(err, routeChoosen, routeID, response){
  if(err != null || routeID == null || routeChoosen == null){
    response.func(true, null, response.res);
  }
  else{
    response.func(null, {success : 1, routeID: routeID, route : routeChoosen}, response.res);
  }
}
