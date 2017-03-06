var async = require('async');
var getLocationsAlongPath = require('../../../external_apis/google_maps/google_maps').getLocationsAlongPath;
var getTownName = require('../../../external_apis/google_maps/google_maps').getTownName;
var getWeatherAtLocation = require('../../../external_apis/dark_sky/dark_sky');

module.exports = function(pathIntersections, dateTime, numPoints, minutesPerInterval, callback){
  getLocationsAlongPath(pathIntersections, numPoints, function(err, locations){
    if(err == null){
      var asyncTasks = getAllAsyncTasks(locations, dateTime, minutesPerInterval);
      async.parallel(asyncTasks, function(err, weatherCards){
        callback(err, weatherCards);
      });
    }
    else{
      callback(err, null);
    }
  });
}

var getAllAsyncTasks = function(locations, date, minutesPerInterval){
  var toReturn = [];
  var index = 0;
  locations.forEach(function(location){
    toReturn.push(toGetData(index, location, date, minutesPerInterval));
    index++;
  });
  return toReturn;
}

function WeatherCard(numPosition, weatherType, temp, time, lat_lng, town){
  this.numPosition = numPosition;
  this.weatherType = weatherType;
  this.temp = temp;
  this.time = time;
  this.lat_lng = lat_lng;
  this.town = town;
}

var addMinutes = function(date, minutes) {
    return new Date(date.getTime() + minutes*60000);
}

var toGetData = function(index, location, date, minutesPerInterval){
  var newDate = addMinutes(date, index * minutesPerInterval);
  var asyncTasks = getOneAsyncTask(index, location, newDate);
  var getTownAndWeather = function(callback){
    async.parallel(asyncTasks, function(err, results){
      if(err == null){
        var name = results[0];
        var weather = results[1];
        var weatherCard = new WeatherCard(index + 1, weather.type, weather.temp, newDate, location, name);
        callback(null, weatherCard);
      }
      else{
        callback(err, null);
      }
    });
  };
  return getTownAndWeather;
}

var getOneAsyncTask = function(index, location, date){
  var tasks = [];
  var getTownNameTask = function(callback){
    getTownName(location, function(err, name){
      callback(err, name);
    });
  }
  tasks.push(getTownNameTask);
  var getWeatherAtLocationTask = function(callback){
    getWeatherAtLocation(location, date, function(err, temp, weatherType){
      callback(err, {temp:temp,type:weatherType});
    });
  }
  tasks.push(getWeatherAtLocationTask);
  return tasks;
}
