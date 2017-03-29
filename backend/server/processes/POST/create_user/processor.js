var apiCalls = require('../../shared/api_calls');
var History = require('../../shared/history');
var userIDGenerator = require('../../../random_generator/unique_id_generator').generateUserID;
var createUser = require('../../../database/database').insert.users.createUser;
var doesEmailExist = require('../../../database/database').retrieve.users.doesEmailExist;
var doesUsernameExist = require('../../shared/username_exists');
module.exports = function(request, response){
  var email = request.email;
  var username = request.username;
  doesEmailExist(email, function(err, exists){
    if(!exists){
      doesUsernameExist(request, function(err, exists){
        if(!exists){
          userIDGenerator(function(err, newUserID){
            if(err == null){
              request.userID = newUserID;
              createUser(request, function(err){
                var intent = 'Email: ' + email + ' Username: ' + username;
                responseToSend(err, newUserID, response, intent);
              });
            }
            else{
              var intent = 'Email: ' + email + 'Username: ' + username + ' System Error';
               responseToSend(err, null, response, intent);
            }
          });
        }
        else{
          var intent = 'Email: ' + email + ' Username: ' + username + ' already exists.';
          responseToSend(err, null, response, intent);
        }
      });
    }
    else{
      var intent = 'Email: ' + email + ' already exists';
      responseToSend(err, null, response, intent);
    }
  });
}

var responseToSend = function(err, userID, response, intent){
  var type = apiCalls.postCreateUserString;
  var history = new History(userID, type, intent);
  if(err != null || userID == null){
    response.func(true, null, history, response.res);
  }
  else{
    response.func(null, {success : 1, userID: userID}, history, response.res);
  }
}
