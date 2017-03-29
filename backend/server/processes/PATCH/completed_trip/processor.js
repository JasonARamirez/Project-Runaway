var apiCalls = require('../../shared/api_calls');
var History = require('../../shared/history');
var doesRouteIDExist = require('../../shared/route_id_exists');
var completeRoute = require('./complete_route');

module.exports = function(request, response){
  var userID = request.userID;
  var routeID = request.routeID;
  doesRouteIDExist(routeID, userID, function(exists){
    if(exists){
      completeRoute(routeID, function(err){
        var intent = 'RouteID: ' + routeID;
        responseToSender(err, response, userID, intent);
      });
    }
    else{
      var intent = 'RouteID: ' + routeID + ' does not exist.';
      responseToSender(true, response, userID, intent);
    }
  });
}

var responseToSender = function(err, response, userID, intent){
  var type = apiCalls.patchCompletedTripString;
  var history = new History(userID, type, intent);
  if(err != null){
    response.func(true, null, history, response.res);
  }
  else{
    response.func(null, {success : 1}, history, response.res);
  }
}
