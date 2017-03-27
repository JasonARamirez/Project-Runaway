var userID = 'a3a09cc2-6579-Ufc3-94b3-47699fba64d2';
var createTrips = require('./createTrips');
var async = require('async');
var createRoadTrip = require('./post_road_trip');
var cancelTrip = require('./delete_cancel_trip');
var completeTrip = require('./patch_completed_trip');
var getWeatherAlongRoute = require('./get_weather_along_route');
var site = 'http://localhost:8080';

var addSeconds = function(date, seconds) {
    return new Date(date.getTime() + seconds*1000);
}

var date = addSeconds(new Date(), 46800);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var createTasks = function(trips, userID, site, date){
  var tasks = [];
  var index = 0;
  trips.forEach(function(trip){
    index++;
    var toInsert = function(callback){
      createRoadTrip(site, userID, trip.start, trip.end, addSeconds(date, index), function(err, routeID){
        if(err == null){
          console.log('New routeID: ' + routeID);
          getWeatherAlongRoute(site, userID, routeID, function(err){
            if(err == null){
              var choice = getRandomInt(1, 3);
              if(choice == 3){
                cancelTrip(site, userID, routeID, callback);
              }
              else if(choice == 2){
                completeTrip(site, userID, routeID, callback);
              }
              else{
                callback(null);
              }
            }
            else{
              callback(err);
            }
          });
        }
        else{
          callback(err);
        }
      });
    }
    tasks.push(toInsert);
  });
  return tasks;
}

var index = 0;
async.whilst(
  function(){return index < 200},
  function(callback){
    createTrips(3, function(err, trips){
      var tasks = createTasks(trips, userID, site, date);
      async.parallel(tasks, function(err){
        console.log(err);
        console.log('Finished: ' + (index + 1) * 3);
        index++;
        callback(err);
      });
    });
  },
  function(callback){
    console.log('Done');
  }
);
