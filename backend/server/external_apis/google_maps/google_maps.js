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
  key: 'AIzaSyCjcFm5tomMm8FYrDetmna78obhvgRt-WM'
});
//https://googlemaps.github.io/google-maps-services-js/docs/GoogleMapsClient.html
module.exports = {
  getDirections : function(start, end, callback){
    var params = {
      origin : start,
      destination : end
    }
    googleMapsClient.directions(params, function(err, response){
      if(err){
        callback(err, null);
      }
      else{
        var Route = require('./route');
        var routesToReturn = [];
        var routes = response.json.routes;
        for(var index = 0; index < routes.length; index++){
          var pathsForRoute = getARoute(routes[index]);
          var toAdd = new Route(start, end, pathsForRoute);
          routesToReturn.push(toAdd);
        }
        callback(null, routesToReturn);
      }
    });
  },

  getLocationsAlongPath : function(paths, numPoints, callback){
    var params = {
      path : paths,
      samples : numPoints
    }
    googleMapsClient.elevationAlongPath(params, function(err, response){
      if(err){
        callback(err, null);
      }
      else{
        var results = response.json.results;
        var locations = getLocationsFromResults(results);
        callback(null, locations);
      }
    });
  },

  getTownName : function(location, callback){
    var params = {
      latlng : location
    }
    googleMapsClient.reverseGeocode(params, function(err, response){
      if(err){
        callback(err, null);
      }
      else{
        var name = findLocationName(response.json.results[0].address_components);
        callback(null, name);
      }
    });
  }
}

var getARoute = function(route){
  var paths = [];
  var legs = route.legs;
  var numPath = 1;
  for(var index = 0; index < legs.length; index++){
    var newPaths = getPaths(legs[index], numPath);
    numPath += newPaths.length;
    paths = paths.concat(newPaths);
  }
  return paths;
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

var getLocationsFromResults = function(points){
  var locations = [];
  for(var index = 0; index < points.length; index++){
    var toPush = getLocations(points[index]);
    locations.push(toPush);
  }
  return locations;
}

var getLocations = function(point){
  var pointLocation = point.location;
  var location = [pointLocation.lat, pointLocation.lng];
  return location;
}

var findLocationName = function(addressComponents){
  var searchingForLocality = true;
  var locality = null;
  var state = null;
  for(var index = 0; index < addressComponents.length; index++){
    if(searchingForLocality){
      locality = getLocality(addressComponents[index]);
      if(locality != null){
        searchingForLocality = false;
      }
    }
    else{
      state = getState(addressComponents[index]);
      if(state != null){
        break;
      }
    }
  }

  return locality + ', ' + state;
}

var getLocality = function(addressComponent){
  var types = addressComponent.types;
  for(var typeIndex = 0; typeIndex < types.length; typeIndex++){
    var type = types[typeIndex];
    if(isLocalityType(type)){
      return addressComponent.long_name;
    }
  }
  return null;
}

var isLocalityType = function(type){
  return type.indexOf('locality') >= 0;
}

var getState = function(addressComponent){
  var types = addressComponent.types;
  for(var index = 0; index < types.length; index++){
    var type = types[index];
    if(isStateType(type)){
      return addressComponent.short_name;
    }
  }
  return null;
}

var isStateType = function(type){
  return type == 'administrative_area_level_1';
}
