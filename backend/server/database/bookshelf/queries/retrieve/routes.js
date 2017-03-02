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
  }
}
