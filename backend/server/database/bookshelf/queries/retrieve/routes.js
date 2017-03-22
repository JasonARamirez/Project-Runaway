var Route = require('../../models/routes');
var Routes = require('../../collections/routes');

module.exports = {
  isRouteID : function(routeID, callback){
    Route.where('ID', routeID).fetch().then(function(found){
      if(found){
        callback(null, true);
      }
      else{
        callback(null, false);
      }
    });
  },
  isRouteIDActive : function(routeID, userID, callback){
    Route.where({ID : routeID, userID : userID, done : false, canceled : false}).fetch().then(function(found){
      if(found){
          callback(null, true);
      }
      else{
        callback(null, false);
      }
    });
  },
  getRoutePaths : function(routeID, callback){
    Route.where('ID', routeID).fetch({withRelated : ['paths', 'paths.start', 'paths.end']}).then(function(found){
      if(found){
        callback(null, found.relations.paths.models, found.attributes.startTime);
      }
      else{
        callback(true, null);
      }
    });
  },

  getRouteDetails : function(routeID, callback){
    Route.where('ID', routeID).fetch({withRelated : ['startLocation', 'endLocation']}).then(function(found){
      if(found){
        callback(null, found.attributes, found.relations.startLocation, found.relations.endLocation);
      }
      else{
        callback(true, null);
      }
    });
  },

  getActiveRoutes : function(userID, callback){
    Routes.query('where', {userID : userID, done : false, canceled : false}).fetch({withRelated : ['startLocation', 'endLocation']}).then(function(routesFound){
      var routesToReturn = [];
      routesFound.models.forEach(function(routeFound){
        var attributes = routeFound.attributes;
        var locations = routeFound.relations;
        var routeToInsert = {
          routeID : attributes.ID,
          startTime : attributes.startTime,
          startLocation : getLatLng(locations.startLocation),
          endLocation : getLatLng(locations.endLocation)
        }
        routesToReturn.push(routeToInsert);
      });
      callback(null, routesToReturn);
    });
  }
}

var getLatLng = function(location){
  var attributes = location.attributes;
  var latLng = [];
  latLng.push(attributes.lat);
  latLng.push(attributes.lng);
  return latLng;
}
