module.exports = function(req, callback){
  var hasCorrectProperties = checkCompletedTripJSONProperties(req);
  if(hasCorrectProperties){
    var isValid = validateChangeStartData(req);
      if(isValid){
        callback(null);
      }
      else{
        callback(true);
      }
    }
  else{
    callback(true);
  }
}

var checkCompletedTripJSONProperties = function(req){
  var hasUserID = req.hasOwnProperty('userID');
  return hasUserID;
}

var validateCompletedTripData = function(req){
  var userIDRegEx = /^[a-zA-Z0-9]{8}[-][a-zA-Z0-9]{4}[-][U][a-zA-Z0-9]{3}[-][a-zA-Z0-9]{4}[-][a-zA-Z0-9]{12}/;
  var userID = req.userID;
  var validUserID = userIDRegEx.test(userID);

  console.log('Valid UserID: ' + validUserID);

  return validUserID;
}
