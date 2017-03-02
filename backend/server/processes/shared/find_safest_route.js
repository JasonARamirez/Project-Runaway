var getDirections = require('../../external_apis/google_maps/google_maps').getDirections;
module.exports = function(start, end, callback){
  getDirections(start, end, function(err, routes){
    if(err == null){
      var hasRoute = routes.length > 0;
      if(hasRoute){
        findSafestRoute(routes, function(err, safestRoute){
          if(err == null){
            callback(null, safestRoute);
          }
          else{
            callback(true, null);
          }
        });
      }
      else{
        callback(true, null);
      }
    }
    else{
      callback(true, null);
    }
  });
}

var findSafestRoute = function(routes, callback){
  //At the moment, returns a random route
  var max = Math.floor(routes.length);
  var numToChoose = Math.floor(Math.random() * max);
  callback(null, routes[numToChoose]);
}
