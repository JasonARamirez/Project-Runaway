var apiCalls = require('../../shared/api_calls');
var History = require('../../shared/history');
var doesUsernameExist = require('../../shared/username_exists');
var getPassword = require('../../../database/database').retrieve.users.getPassword;
var getUserData = require('../../../database/database').retrieve.users.getUserData;
var getRouteData = require('./get_route_data');
module.exports = function(request, response){
  doesUsernameExist(request, function(err, exists){
    var username = request.username;
    var password = request.password;
    if(exists){
      getPassword(username, function(err, realPassword){
        if(password == realPassword){
          console.log('Passwords Match')
          getUserData(username, password, function(err, user, routes){
            if(err == null){
              var withRoutes = request.withRoutes;
              if(withRoutes == 1){
                getRouteData(routes, function(err, activeRoutes){
                  var intent = 'With Routes'
                  responseToSend(err, user.ID, activeRoutes, response, intent);
                });
              }
              else{
                var intent = 'Without Routes';
                responseToSend(err, user.ID, null, response, intent);
              }
            }
            else{
              var intent = 'Error in the system';
              responseToSend(true, user.ID, null, response, intent);
            }
          });
        }
        else{
          getUserData(username, realPassword, function(err, user, routes){
            var intent = 'Username: ' + username + ' did not match password: ' + password;
            responseToSend(true, user.ID, null, response, intent);
          });
        }
      });
    }
    else{
      var intent = 'Username does not exist';
      responseToSend(true, null, null, response, username, intent);
    }
  });
}

var responseToSend = function(err, userID, routes, response, intent){
  var type = apiCalls.getLoginString;
  var history = new History(userID, type, intent);
  if(err != null || userID == null){
    response.func(true, null, history, response.res);
  }
  else if(routes == null){
    response.func(null, {success : 1, userID: userID}, history, response.res);
  }
  else{
    response.func(null, {success : 1, userID: userID, routes : routes}, history, response.res);
  }
}
