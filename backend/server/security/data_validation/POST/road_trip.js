module.exports = function(req, callback){
  hasCorrectProperties = checkRoadTripProperties(req);
  if(hasCorrectProperties){
    isValid = validateRoadTrip(req);
    if(isValid){
      callback(null);
    }
    else{
      callback(true)
    }
  }
  else{
    callback(true);
  }
}

var checkRoadTripProperties = function(req){
  var hasUserID = req.hasOwnProperty('userID');
  var hasStart = req.hasOwnProperty('start');
  var hasEnd = req.hasOwnProperty('end');
  var hasStartTime = req.hasOwnProperty('startTime');

  return hasUserID && hasStartTime && hasEnd && hasStart;
}

var validateRoadTrip = function(req){
  var userIDRegEx = /^[a-zA-Z0-9]{8}[-][a-zA-Z0-9]{4}[-][U][a-zA-Z0-9]{3}[-][a-zA-Z0-9]{4}[-][a-zA-Z0-9]{12}/;
  var userID = req.userID;
  var validUserID = userIDRegEx.test(userID);
  console.log(userID);
  console.log('Valid UserID: ' + validUserID)

  var start = req.start;
  if(!isArray(start) || start.length != 2){
    console.log('Valid start: false');
    return false;
  }

  var startLat = parseInt(start[0], 10);
  var validStartLat = !isNaN(startLat);

  console.log('Valid Start Latitude: ' + validStartLat);

  var startLng = parseInt(start[1], 10);
  var validStartLng = !isNaN(startLng);

  console.log('Valid Start Longitude: ' + validStartLng);

  var end = req.end;
  if(!isArray(end) || end.length != 2){
    console.log('Valid end: false');
    return false;
  }

  var endLat = parseInt(end[0], 10);
  var validEndLat = !isNaN(endLat);

  console.log('Valid End Latitude: ' + validEndLat);

  var endLng = parseInt(end[1], 10);
  var validEndLng = !isNaN(endLng);

  console.log('Valid End Longitude: ' + validEndLng);

  var startTimeRegex = /^(\d{2})\.(\d{2})\.(\d{4})-(\d{2}):(\d{2}):(\d{2})$/;
  var startTime = req.startTime;
  var matches = startTime.match(startTimeRegex);
  console.log(startTime);
  if(!(matches > 0)){
    console.log('Valid Start Time RegEx: false');
    return false;
  }

  var validDate = correctDate(matches);

  console.log('Valid Date: ' + validDate);

  return validUserID && validStartLat && validStartLng && validEndLat && validEndLng && validDate;
}

function isArray(toTest) {
    return Object.prototype.toString.call(toTest) === '[object Array]';
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
