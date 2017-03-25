var doesUserIDExist = require('../../shared/user_id_exists');
var getAllRoutes = require('./get_all_routes');
module.exports = function(request, response){
  var userID = request.userID;
  doesUserIDExist(userID, function(err, exists){
    if(err == null && exists){
      getAllRoutes(userID, function(err, routes){
        responseToSend(err, routes, response);
      });
    }
    else{
      responseToSend(err, null, response);
    }
  });
}

var responseToSend = function(err, routes, response){
  if(err != null || routes == null){
    response.func(true, null, response.res);
  }
  else{
    response.func(null, {success : 1, routes : routes}, response.res);
  }
}
