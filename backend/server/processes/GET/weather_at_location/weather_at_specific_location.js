var async = require('async');
var getTownName = require('../../../external_apis/google_maps/google_maps').getTownName;
var getWeatherAtLocation = require('../../../external_apis/dark_sky/dark_sky');

module.exports = function(location, date, callback){
  var asyncTasks = createTasks(location, date);
  async.parallel(asyncTasks, function(err, results){
    if(err == null){
      var townName = results[0];
      var weather = results[1];
      var weatherCard = new WeatherCard(weather.type, weather.temp, townName);
      callback(err, weatherCard);
    }
    else{
      callback(err, null);
    }
  });
}

var createTasks = function(location, date){
  var tasks = [];
  var getTownNameTask = function(callback){
    getTownName(location, function(err, name){
      callback(err, name);
    });
  };
  tasks.push(getTownNameTask);
  var getWeatherAtLocationTask = function(callback){
    getWeatherAtLocation(location, date, function(err, temp, weatherType){
      callback(err, {temp:temp,type:weatherType});
    });
  };
  tasks.push(getWeatherAtLocationTask);
  return tasks;
}

function WeatherCard(weatherType, temp, town){
  this.weatherType = weatherType;
  this.temp = temp;
  this.town = town;
}
