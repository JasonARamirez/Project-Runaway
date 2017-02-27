/*var GoogleMapsAPI = require('googlemaps');

var publicConfig = {
  key: 'AIzaSyDEaX0V5IP1RXC0OWAjeGIFM5ZyoVp1p74',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true // use https
};

var gmAPI = new GoogleMapsAPI(publicConfig);

module.exports = gmAPI;
*/
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDEaX0V5IP1RXC0OWAjeGIFM5ZyoVp1p74'
});
//https://googlemaps.github.io/google-maps-services-js/docs/GoogleMapsClient.html
module.exports = {
  getDirections : function(start, end, callback){
    startLatLng = [start.lat, start.lng];
    endLatLng = [end.lat, end.lng];
    var params = {
      origin : startLatLng,
      destination : endLatLng
    }
    googleMapsClient.directions(params, function(err, response){
      if(err){
        callback(err, null);
      }
      else{
        var routesToReturn = [];
        var routes = response.routes;
        for(var index = 0; index < routes.length; index++){
          routesToReturn.push(getARoute(routes[index]));
        }
        callback(null, routesToReturn);
      }
    });
  },

  getLocationsAlongPath : function(start, end){
    //TODO
  },

  getTownName : function(location){
    //TODO
  }
}

var getARoute = function(route){
  var paths = [];
  var legs = route.legs;
  var numPath = 1;
  for(var index = 0; index < legs.length; index++){
    var newPaths = getPaths(legs[index], numPath);
    numPath += newPaths.length;
    paths.append(newPaths);
  }
}

var getPaths = function(leg, numPath){
  var Path = require('./paths');
  var paths = [];
  var steps = leg.steps;
  for(var index = 0; index < steps.length; index++){
    var path = new Path(steps[index], numPath);
    paths.push(path);
    numPath++;
  }
  return paths;
}
