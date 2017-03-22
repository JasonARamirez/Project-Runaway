var doesUsernameExist = require('../../shared/username_exists');
var getPassword = require('../../../database/database').retrieve.users.getPassword;
var getUserData = require('../../../database/database').retrieve.users.getUserData;
var getRouteData = require('./get_route_data');
module.exports = function(request, response){
  doesUsernameExist(request, function(err, exists){
    if(exists){
      getPassword(request.username, function(err, password){
        if(request.password == password){
          console.log('Passwords Match')
          getUserData(request.username, request.password, function(err, user, routes){
            if(err == null){
              getRouteData(routes, function(err, activeRoutes){
                responseToSend(err, user.ID, activeRoutes, response);
              });
            }
            else{
              responseToSend(true, null, null, response);
            }
          });
        }
        else{
          responseToSend(true, null, null, response);
        }
      });
    }
    else{
      responseToSend(true, null, null, response);
    }
  });
}

var responseToSend = function(err, userID, routes, response){
  if(err != null || userID == null || routes == null){
    response.func(true, null, response.res);
  }
  else{
    response.func(null, {success : 1, userID: userID, routes : routes}, response.res);
  }
}
