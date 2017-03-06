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
  getRoute : function(routeID, callback){
    Route.where('ID', routeID).fetch({withRelated : ['paths', 'paths.start', 'paths.end']}).then(function(found){
      if(found){
        callback(null, found.relations.paths.models, found.attributes.startTime);
      }
      else{
        callback(true, null);
      }
    });
  }
}
