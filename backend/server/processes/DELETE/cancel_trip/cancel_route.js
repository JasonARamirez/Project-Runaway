var makeRouteDeleted = require('../../../database/database').modify.routes.markDeleted;

module.exports = function(routeID, callback){
  makeRouteDeleted(routeID, function(err){
    callback(err);
  });
}
