var userIDGenerator = require('../../../random_generator/unique_id_generator').generateUserID;
var createUser = require('../../../database/database').insert.users.createUser;
var doesEmailExist = require('../../../database/database').retrieve.users.doesEmailExist;
module.exports = function(request, response){
  doesEmailExist(request.email, function(err, exists){
    if(!exists){
      userIDGenerator(function(err, newUserID){
        if(err == null){
          request.userID = newUserID;
          createUser(request, function(err){
            responseToSend(err, newUserID, response);
          });
        }
        else{
          responseToSend(err, null, response);
        }
      });
    }
    else{
      responseToSend(err, null, response);
    }
  });
}

var responseToSend = function(err, userID, response){
  if(err != null || userID == null){
    response.func(true, null, response.res);
  }
  else{
    response.func(null, {success : 1, userID: userID}, response.res);
  }
}
