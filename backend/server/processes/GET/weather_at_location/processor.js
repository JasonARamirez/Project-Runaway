var apiCalls = require('../../shared/api_calls');
var History = require('../../shared/history');
var doesUserIDExist = require('../../shared/user_id_exists');
var getStartTimeDateTime = require('../../shared/create_date_time');
var getData = require('./weather_at_specific_location');

module.exports = function(request, response){
  var userID = request.userID;
  doesUserIDExist(userID, function(exists){
    if(exists){
      var date = getStartTimeDateTime(request.time);
      getData(request.loc, date, function(err, weatherCard){
        var intent = 'Location: ' + request.loc + ' Date: ' + date;
        responseToSender(err, weatherCard, response, userID, intent);
      });
    }
    else{
      var intent = 'UserID does not exist';
      responseToSender(true, null, response, userID, intent);
    }
  });
}

var responseToSender = function(err, weatherCard, response, userID, intent){
  var type = apiCalls.getWeatherAtLocationString;
  var history = new History(userID, type, intent);
  if(err != null || weatherCard == null){
    response.func(true, null, history, response.res);
  }
  else{
    response.func(null, {success : 1, weatherCard: weatherCard}, history, response.res);
  }
}
