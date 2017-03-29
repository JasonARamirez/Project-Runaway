var getDirections = require('../../external_apis/google_maps/google_maps').getDirections;
module.exports = function(start, end, startTime, callback){
  getDirections(start, end, function(err, routes){
    if(err == null){
      var hasRoute = routes.length > 0;
      if(hasRoute){
        findSafestRoute(routes, startTime, function(err, safestRoute, choosenStartTime){
          if(err == null){
            callback(null, safestRoute, choosenStartTime);
          }
          else{
            callback(true);
          }
        });
      }
      else{
        callback(true);
      }
    }
    else{
      callback(true);
    }
  });
}

var findSafestRoute = function(routes, startTime, callback){
  //At the moment, returns a random route
  var max = Math.floor(routes.length);
  var numToChoose = Math.floor(Math.random() * max);
  callback(null, routes[numToChoose], startTime);
}
