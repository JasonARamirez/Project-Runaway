module.exports = function(req, callback){
  var hasCorrectProperties = checkCancelTripJSONProperties(req);
  if(hasCorrectProperties){
    var isValid = validateCancelTripData(req);
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

var checkCancelTripJSONProperties = function(req){
  var hasUserID = req.hasOwnProperty('userID');
  var hasRouteID = req.hasOwnProperty('routeID');

  return hasUserID && hasRouteID;
}

var validateCancelTripData = function(req){
  var userIDRegEx = /^[a-zA-Z0-9]{8}[-][a-zA-Z0-9]{4}[-][U][a-zA-Z0-9]{3}[-][a-zA-Z0-9]{4}[-][a-zA-Z0-9]{12}/;
  var userID = req.userID;
  var validUserID = userIDRegEx.test(userID);

  console.log('Valid UserID: ' + validUserID);

  /*var routeIDRegEx = /^[a-zA-Z0-9]{8}[-][a-zA-Z0-9]{4}[-][R][a-zA-Z0-9]{3}[-][a-zA-Z0-9]{4}[-][a-zA-Z0-9]{12}/;
  var routeID = req.routeID;
  var validRouteID = userIDRegEx.test(routeID);

  console.log('Valid UserID: ' + validRouteID);*/

  return validUserID /*&& validRouteID*/;
}
