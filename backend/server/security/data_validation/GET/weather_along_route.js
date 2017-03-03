module.exports = function(req, callback){
    var hasCorrectProperties = checkWeatherAlongRouteProperties(req);
	if(hasCorrectProperties){
    var isValid = validateCheckWeatherAlongRoute(req);
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

var checkWeatherAlongRouteProperties = function(req){
  var hasUserID = req.hasOwnProperty('userID');
  var hasRouteID = req.hasOwnProperty('routeID');
  var hasTimeOrDistance = req.hasOwnProperty('timeOrDistance');
  var hasInterval = req.hasOwnProperty('interval');

  return hasUserID && hasRouteID && hasTimeOrDistance && hasInterval;
}

var validateCheckWeatherAlongRoute = function(req){
  var userIDRegEx = /^[a-zA-Z0-9]{8}[-][a-zA-Z0-9]{4}[-][U][a-zA-Z0-9]{3}[-][a-zA-Z0-9]{4}[-][a-zA-Z0-9]{12}/;
  var userID = req.userID;
  var validUserID = userIDRegEx.test(userID);

  console.log('Valid UserID: ' + validUserID);

  var routeIDRegEx = /^[a-zA-Z0-9]{8}[-][a-zA-Z0-9]{4}[-][R][a-zA-Z0-9]{3}[-][a-zA-Z0-9]{4}[-][a-zA-Z0-9]{12}/;
  var routeID = req.routeID;
  var validRouteID = routeID.match(userIDRegEx) > 0;

  console.log('Valid RouteID: ' + validRouteID);

  var timeOrDistance = req.timeOrDistance;
  var numTorD = parseInt(timeOrDistance, 10);
  var validTorD = !isNaN(numTorD);
  validTorD = validTorD && numTorD >= 0 && numTorD <= 1;

  console.log('Valid timeOrDistance: ' + validTorD);

  var interval = req.interval;
  var numInterval = parseInt(interval, 10);
  var validInterval = !isNaN(numInterval);
  validInterval = validInterval && numInterval >= 15;

  console.log('Valid Interval: ' + validInterval);

  return validUserID /*&& validRouteID*/ && validTorD && validInterval;
}
