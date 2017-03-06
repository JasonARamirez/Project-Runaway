var doesUserIDExist = require('../../shared/user_id_exists');
var findSafestRoute = require('../../shared/find_safest_route');
var saveRoute = require('../../shared/save_route');
var createRouteID = require('../../../random_generator/unique_id_generator').generateRouteID;
var getStartTimeDateTime = require('../../shared/create_date_time');

module.exports = function(request, response){
  var userID = request.userID;
  doesUserIDExist(userID, function(exists){
    if(exists){
      findSafestRoute(request.start, request.end, function(err, route){
        if(err == null){
          createRouteID(function(routeID){
            var startTime = getStartTimeDateTime(request.startTime);
            saveRoute(route, userID, routeID, startTime, function(err){
              if(err == null){
                responseToSender(null, route, routeID, response);
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
