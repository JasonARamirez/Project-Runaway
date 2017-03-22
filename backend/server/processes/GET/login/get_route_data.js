var async = require('async');
var getStartEndAddresses = require('./get_start_end_location_address');
module.exports = function(routes, callback){
  var asyncTasks = createTasks(routes);
  async.parallel(asyncTasks, callback);
}

var createTasks = function(routes){
  var tasks = [];
  routes.forEach(function(route){
    var createActiveRoute = function(callback){
      getStartEndAddresses(route.startLocation, route.endLocation, function(err, start, end){
        if(err == null){
          var routeToInsert = {
            routeID : route.routeID,
            startTime : route.startTime,
            start : start,
            end : end
          }
          callback(null, routeToInsert);
        }
        else{
          callback(err, null);
        }
      });
    }
    tasks.push(createActiveRoute);
  });
  return tasks;
}
