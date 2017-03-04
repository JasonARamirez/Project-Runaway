var doesUserIDExist = require('../../shared/user_id_exists');
var getStartTimeDateTime = require('../../shared/create_date_time');
var getData = require('./weather_at_specific_location');

module.exports = function(request, response){
  var userID = request.userID;
  doesUserIDExist(userID, function(exists){
    if(exists){
      var date = getStartTimeDateTime(request.time);
      getData(request.loc, date, function(err, weatherCard){
        responseToSender(err, weatherCard, response);
      });
    }
    else{
      responseToSender(true, null, response);
    }
  });
}

var responseToSender = function(err, weatherCard, response){
  if(err != null || weatherCard == null){
    response.func(true, null, response.res);
  }
  else{
    response.func(null, {success : 1, weatherCard: weatherCard}, response.res);
  }
}
