var doesUsernameExist = require('../../shared/username_exists');
var getPassword = require('../../../database/database').retrieve.users.getPassword;
var getUserData = require('../../../database/database').retrieve.users.getUserData;
module.exports = function(request, response){
  doesUsernameExist(request, function(err, exists){
    if(exists){
      getPassword(request.username, function(err, password){
        if(request.password == password){
          console.log('Passwords Match')
          getUserData(request.username, request.password, function(err, user){
            if(err == null){
              var attributes = user.attributes;
              //TODO
              responseToSend(null, attributes.ID, [], response);
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

var responseToSend = function(err, userID, routeIDs, response){
  if(err != null || userID == null || routeIDs == null){
    response.func(true, null, response.res);
  }
  else{
    response.func(null, {success : 1, userID: userID, routeIDs : routeIDs}, response.res);
  }
}
