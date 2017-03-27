var request = require('request');

module.exports = function(host, userID, startLocation, endLocation, startDateTime, callback){
  var newRoadTrip = new RoadTrip(userID, startLocation, endLocation, prDate(startDateTime));
  var url = host + '/roadTrip?request=' + JSON.stringify(newRoadTrip);

  request.post(url, function(err, response, body){
    if(err){
      callback(err);
    }
    else{
      var data = JSON.parse(body);
      if(data.success == 1){
        callback(null, data.routeID);
      }
      else{
        callback('post road trip failed');
      }
    }
  });
}

function RoadTrip(userID, startLocation, endLocation, startTime){
  this.userID = userID;
  this.start = startLocation;
  this.end = endLocation;
  this.startTime = startTime;
}

function prDate(startDateTime){
  var day = addZeroIfNec(startDateTime.getDate());
  var month = addZeroIfNec(startDateTime.getMonth());
  var year = addZeroIfNec(startDateTime.getFullYear());
  var hour = addZeroIfNec(startDateTime.getHours());
  var minutes = addZeroIfNec(startDateTime.getMinutes());
  var seconds = addZeroIfNec(startDateTime.getSeconds());

  return day + '/' + month + '/' + year + '-' + hour + ':' + minutes + ':' + seconds;
}

function addZeroIfNec(time){
  if(time < 10){
    return '0' + time;
  }
  return time;
}
