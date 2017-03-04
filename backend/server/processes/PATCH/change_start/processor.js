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
        responseToSender(err, response);
      });
    }
    else{
      responseToSender(true, response);
    }
  });
}

var responseToSender = function(err, response){
  if(err != null){
    response.func(true, null, response.res);
  }
  else{
    response.func(null, {success : 1}, response.res);
  }
}
