var apiCalls = require('../../shared/api_calls');
var History = require('../../shared/history');
var doesRouteIDExist = require('../../shared/route_id_exists');
var getStartTimeDateTime = require('../../shared/create_date_time');
var changeTime = require('./change_time');

module.exports = function(request, response){
  var userID = request.userID;
  var routeID = request.routeID;

  doesRouteIDExist(routeID, userID, function(exists){
    if(exists){
      var date = getStartTimeDateTime(request.newStartTime);
      changeTime(request.routeID, date, function(err){
        var intent = 'RouteID: ' + routeID + ' New Date: ' + date;
        responseToSender(err, response, userID, intent);
      });
    }
    else{
      var intent = 'RouteID: ' + routeID + ' does not exist';
      responseToSender(true, response, userID, intent);
    }
  });
}

var responseToSender = function(err, response, userID, intent){
  var type = apiCalls.patchChangeStartTimeString;
  var history = new History(userID, type, intent);
  if(err != null){
    response.func(true, null, history, response.res);
  }
  else{
    response.func(null, {success : 1}, history, response.res);
  }
}
