var async = require('async');
var getLocationsAlongPath = require('../../../external_apis/google_maps/google_maps').getLocationsAlongPath;
var getTownName = require('../../../external_apis/google_maps/google_maps').getTownName;
var getWeatherAtLocation = require('../../../external_apis/dark_sky/dark_sky');

module.exports = function(pathIntersections, dateTime, numPoints, minutesPerInterval, callback){
  getLocationsAlongPath(pathIntersections, numPoints, function(err, locations){
    var asyncTasks = getAsyncTasks(locations, dateTime);
    async.parallel(asyncTasks, function(err, weatherCards){
      callback(err, weatherCards);
    });
  });
}

var getAsyncTasks = function(locations, date){
  var toReturn = [];
  var index = 0;
  locations.forEach(function(location){
    toReturn.push(toGetData(index, location, date));
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

var toGetData = function(index, location, date){
  var getTownAndWeather = function(callback){
    getTownName(location, function(err, name){
      var newDate = addMinutes(date, index * 15);
      getWeatherAtLocation(location, newDate, function(err, temp, weatherType){
        var weatherCard = new WeatherCard(index + 1, weatherType, temp, newDate, location, name);
        callback(null, weatherCard);
      });
    });
  }
  return getTownAndWeather;
}
