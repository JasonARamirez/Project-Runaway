var userIDGenerator = require('../../../random_generator/unique_is_generator').generateUserID;
var insertNewUser = require('../../../database/database').insert.users.
module.exports = function(request, response){
  userIDGenerator(function(err, newUserID){
    if(err == null){
      request.newUserID = newUserID;
      createUser(request, function(err){
        responseToSend(err, newUserID, response);
      });
    }
    else{
      responseToSend(err, null, response);
    }
  });
}

var responseToSend(err, userID, response){
  if(err != null || userID == null){
    response.func(err, null, response.res);
  }
  else{
    response.func(null, {success : 1, userID: userID}, response.res);
  }
}
