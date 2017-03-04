var Route = require('../../models/routes');
var Routes = require('../../collections/routes');

module.exports = {
  changeTime : function(routeID, startTime, callback){
    Route.where('ID', routeID).save({startTime : startTime}, {patch:true});
    callback(null);
  },

  completeRoute : function(routeID, callback){
    Route.where('ID', routeID).save({done:true}, {patch:true});
    callback(null);
  },

  markDeleted : function(routeID, callback){
    Route.where('ID', routeID).save({canceled:true}, {patch:true});
    callback(null);
  }
}
