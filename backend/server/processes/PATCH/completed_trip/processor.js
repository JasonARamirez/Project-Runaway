var doesRouteIDExist = require('../../shared/route_id_exists');
var completeRoute = require('./complete_route');

module.exports = function(request, response){
  var userID = request.userID;
  var routeID = request.routeID;
  doesRouteIDExist(routeID, userID, function(exists){
    if(exists){
      completeRoute(routeID, function(err){
        responseToSender(err, response);
      });
    }
    else{
      response(true, response);
    }
  });
}

var responseToSender = function(err, response){
  if(err != null){
    response.func(true, null, response.res);
  }
  else{
    response.func(null, {success : 1}, response.res);
  }
}
