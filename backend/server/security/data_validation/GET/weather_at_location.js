module.exports = function(req, callback){
  var hasCorrectProperties = checkWeatherAtLocationProperties(req);
  if(hasCorrectProperties){
    var isValid = validateWeatherAtLocationData(req);
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

var checkWeatherAtLocationProperties = function(req){
  var hasUserID = req.hasOwnProperty('userID');
  var hasLoc = req.hasOwnProperty('loc');
  var hasTime = req.hasOwnProperty('time');

  return hasUserID && hasLoc && hasTime;
}

var validateWeatherAtLocationData = function(req){
  var userIDRegEx = /^[a-zA-Z0-9]{8}[-][a-zA-Z0-9]{4}[-][U][a-zA-Z0-9]{3}[-][a-zA-Z0-9]{4}[-][a-zA-Z0-9]{12}/;
  var userID = req.userID;
  var validUserID = userIDRegEx.test(userID);
  console.log(userID);
  console.log('Valid UserID: ' + validUserID);

  var loc = req.loc;
  if(!isArray(loc) || loc.length != 2){
    console.log('Valid Location: false');
    return false;
  }

  var locLat = parseInt(loc[0], 10);
  var validLocLat = !isNaN(locLat);

  console.log('Valid Location Latitude: ' + validLocLat);

  var locLng = parseInt(loc[1], 10);
  var validLocLng = !isNaN(locLng);

  console.log('Valid Location Longitude: ' + validLocLng);

  var timeRegex = /^(\d{2})\/(\d{2})\/(\d{4})-(\d{2}):(\d{2}):(\d{2})$/;
  var time = req.time;
  var matches = time.match(timeRegex);
  if(!(matches.length > 0)){
    console.log('Valid Time RegEx: false');
    return false;
  }

  var validTime = correctDate(matches);

  console.log('Valid Date: ' + validTime);

  return validTime && validLocLng && validLocLat && validUserID;
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
