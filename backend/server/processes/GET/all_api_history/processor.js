var apiCalls = require('../../shared/api_calls');
var History = require('../../shared/history');
var doesUserIDExist = require('../../shared/user_id_exists');
var getFormattedHistory = require('./get_history_formatted');
module.exports = function(request, response){
  var userID = request.userID;
  doesUserIDExist(userID, function(exists){
    if(exists){
      getFormattedHistory(userID, function(err, allHistory){
        responseToSend(err, allHistory, response, userID);
      });
    }
    else{
      responseToSend(err, null, response, userID);
    }
  });
}

var responseToSend = function(err, allHistory, response, userID){
  var type = apiCalls.getAllTripsStartEndDataString;
  var history = new History(userID, type, null);
  if(err != null || allHistory == null){
    response.func(true, null, history, response.res);
  }
  else{
    response.func(null, {success : 1, history : allHistory}, history, response.res);
  }
}
