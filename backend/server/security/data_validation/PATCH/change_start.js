module.exports = function(req, callback){
  var hasCorrectProperties = checkChangeStartJSONProperties(req);
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

var checkChangeStartJSONProperties = function(req){
  var hasUserID = req.hasOwnProperty('userID');
  var hasRouteID = req.hasOwnProperty('routeID');
  var hasNewStartTime = req.hasOwnProperty('newStartTime');

  return hasUserID && hasRouteID && hasNewStartTime;
}

var validateChangeStartData = function(req){
  var userIDRegEx = /^[a-zA-Z0-9]{8}[-][a-zA-Z0-9]{4}[-][U][a-zA-Z0-9]{3}[-][a-zA-Z0-9]{4}[-][a-zA-Z0-9]{12}/;
  var userID = req.userID;
  var validUserID = userIDRegEx.test(userID);

  console.log('Valid UserID: ' + validUserID);

  var routeIDRegEx = /^[a-zA-Z0-9]{8}[-][a-zA-Z0-9]{4}[-][R][a-zA-Z0-9]{3}[-][a-zA-Z0-9]{4}[-][a-zA-Z0-9]{12}/;
  var routeID = req.routeID;
  var validRouteID = userIDRegEx.test(routeID);

  console.log('Valid UserID: ' + validRouteID);

  var startTimeRegex = /^(\d{2})\/(\d{2})\/(\d{4})-(\d{2}):(\d{2}):(\d{2})$/;
  var newStartTime = req.newStartTime;
  var matches = newStartTime.match(startTimeRegex);
  if(!(matches.length > 0)){
    console.log('Valid Start Time RegEx: false');
    return false;
  }

  var validNewStartDate = correctDate(matches);

  console.log('Valid Date: ' + validNewStartDate);

  return validUserID && validRouteID && validNewStartDate;
}

function correctDate(matches){
  var year = parseInt(matches[3], 10);
  var month = parseInt(matches[1], 10) - 1; // months are 0-11
  var day = parseInt(matches[2], 10);
  var hour = parseInt(matches[4], 10);
  var minute = parseInt(matches[5], 10);
  var second = parseInt(matches[6], 10);
  var date = new Date(year, month, day, hour, minute, second);
  if (date.getFullYear() !== year
   || date.getMonth() != month
   || date.getDate() !== day
   || date.getHours() !== hour
   || date.getMinutes() !== minute
   || date.getSeconds() !== second) {
     return false;
  }
  else{
    return true;
  }
}
