var apiCalls = require('../../shared/api_calls');
var History = require('../../shared/history');
var doesUserIDExist = require('../../shared/user_id_exists');
var getAllRoutes = require('./get_all_routes');

module.exports = function(request, response){
  var userID = request.userID;
  doesUserIDExist(userID, function(exists){
    if(exists){
      getAllRoutes(userID, function(err, routes){
        responseToSend(err, routes, response, userID);
      });
    }
    else{
      responseToSend(err, null, response, userID);
    }
  });
}

var responseToSend = function(err, routes, response, userID){
  var type = apiCalls.getAllTripsStartEndDataString;
  var history = new History(userID, type, null);
  if(err != null || routes == null){
    response.func(true, null, history, response.res);
  }
  else{
    response.func(null, {success : 1, routes : routes}, history, response.res);
  }
}
